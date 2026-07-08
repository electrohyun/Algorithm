#!/usr/bin/env bash
#
# 알고리즘 공부 현황 대시보드 생성기
# daily-report/YYYY-MM-DD.md(날짜)와 문제 md 파일을 스캔해서
# README.md의 <!-- STATUS:START --> ~ <!-- STATUS:END --> 구간을 갱신합니다.
#
#   사용법: bash scripts/status.sh
#
set -euo pipefail

# 레포 루트로 이동 (스크립트 위치 기준)
cd "$(dirname "$0")/.."

README="README.md"

# 문제종류 폴더명 -> 보기 좋은 라벨 (js-methods -> JS Methods, bfs -> BFS)
# 세 글자 이하 알파벳 토큰(js, bfs, dfs, dp 등)은 약어로 보고 전부 대문자.
label() {
  echo "$1" | awk '{
    n=split($0,a,"-"); s="";
    for(i=1;i<=n;i++){
      t=a[i];
      if (t ~ /^[a-zA-Z]+$/ && length(t)<=3) w=toupper(t);
      else w=toupper(substr(t,1,1)) substr(t,2);
      s=s (i>1?" ":"") w;
    }
    print s
  }'
}

# ---- 문제 md 파일 수집 (00_ 제외, docs/daily-report/scripts 제외) ----
# 문제종류 = 최상위 폴더, 문제 원본 = {종류}/[0-9]*_*.md
prob_files="$(find . -type f -name "[0-9]*_*.md" \
  ! -path "*/daily-report/*" ! -path "*/docs/*" ! -path "*/scripts/*" ! -path "*/.git/*" \
  | grep -vE '/00_' | sort || true)"
total_probs="$(echo "$prob_files" | grep -c . || true)"

# 문제종류별 개수
subject_lines=""
while IFS= read -r dir; do
  [ -z "$dir" ] && continue
  cnt="$(echo "$prob_files" | awk -F/ -v d="$dir" '$0 ~ ("/" d "/") {c++} END{print c+0}')"
  subject_lines+="| $(label "$dir") | ${cnt} |"$'\n'
done < <(echo "$prob_files" | awk -F/ 'NF>1{print $2}' | sort -u)

# ---- daily-report 날짜 수집 ----
dates_desc="$(find daily-report -type f -name "[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md" 2>/dev/null \
  | sed -E 's#.*/([0-9]{4}-[0-9]{2}-[0-9]{2})\.md#\1#' | sort -ru || true)"
total_days="$(echo "$dates_desc" | grep -c . || true)"

is_studied() { echo "$dates_desc" | grep -qx "$1"; }

# 연속 학습(streak) 계산: 최근 학습일부터 하루씩 거슬러 올라가며
# 주말은 건너뛰고, 평일에 기록이 없으면 종료.
streak=0
latest="$(echo "$dates_desc" | head -1)"
if [ -n "$latest" ]; then
  cur="$latest"
  while true; do
    dow="$(date -j -f "%Y-%m-%d" "$cur" +%u 2>/dev/null)"   # 1=월 .. 7=일
    if [ "$dow" -ge 6 ]; then
      cur="$(date -j -v-1d -f "%Y-%m-%d" "$cur" +%Y-%m-%d)"
      continue
    fi
    if is_studied "$cur"; then
      streak=$((streak + 1))
      cur="$(date -j -v-1d -f "%Y-%m-%d" "$cur" +%Y-%m-%d)"
    else
      break
    fi
  done
fi

# daily-report에서 주제 추출:
# 첫 줄 "Day.. (날짜)" 헤더는 건너뛰고, 그다음 첫 제목(# / ## 등)의 텍스트를 씀.
report_topic() {
  local f="$1"
  awk '/^#+ /{
    line=$0; sub(/^#+ */,"",line);
    if (line ~ /^Day[0-9]/) next;     # Day 헤더는 건너뜀
    print line; exit
  }' "$f"
}

# 최근 daily-report 5개
recent_lines=""
while IFS= read -r d; do
  [ -z "$d" ] && continue
  f="daily-report/${d}.md"
  topic="$(report_topic "$f")"
  [ -z "$topic" ] && topic="(제목 없음)"
  recent_lines+="| ${d} | ${topic} | [리포트](./${f}) |"$'\n'
done < <(echo "$dates_desc" | head -5)

now="$(date "+%Y-%m-%d %H:%M")"

# streak 응원 문구
if   [ "$streak" -ge 20 ]; then flame="🔥🔥🔥 미쳤다"
elif [ "$streak" -ge 10 ]; then flame="🔥🔥 불붙었다"
elif [ "$streak" -ge 5  ]; then flame="🔥 순항 중"
elif [ "$streak" -ge 1  ]; then flame="🌱 시작이 반"
else                            flame="💤 오늘 하나 어때요?"
fi

# ---- 갱신할 대시보드 블록 생성 ----
TMP="$(mktemp)"
{
  echo "<!-- STATUS:START -->"
  echo "<!-- 이 구간은 scripts/status.sh가 자동 생성합니다. 직접 수정하지 마세요. -->"
  echo
  echo "## 📊 공부 현황 — 연속 ${streak}일째 ${flame}"
  echo
  echo "| 연속 학습(평일) | 총 학습일 | 총 문제 | 최근 학습일 |"
  echo "| :---: | :---: | :---: | :---: |"
  echo "| **${streak}일** | ${total_days}일 | ${total_probs}개 | ${latest:-없음} |"
  echo
  echo "<details>"
  echo "<summary>문제종류별 · 최근 기록 펼쳐보기</summary>"
  echo
  echo "**문제종류별**"
  echo
  echo "| 종류 | 문제 수 |"
  echo "| --- | --- |"
  printf '%s' "$subject_lines"
  echo
  echo "**최근 기록**"
  echo
  echo "| 날짜 | 주제 | 링크 |"
  echo "| --- | --- | --- |"
  printf '%s' "$recent_lines"
  echo
  echo "</details>"
  echo
  echo "<sub>🔄 마지막 갱신: ${now} · \`bash scripts/status.sh\`로 갱신</sub>"
  echo "<!-- STATUS:END -->"
} > "$TMP"

# ---- README의 마커 구간을 새 블록으로 교체 ----
if ! grep -q "<!-- STATUS:START -->" "$README" || ! grep -q "<!-- STATUS:END -->" "$README"; then
  echo "❌ ${README}에 <!-- STATUS:START --> / <!-- STATUS:END --> 마커가 없습니다." >&2
  rm -f "$TMP"
  exit 1
fi

NEW="$(mktemp)"
awk -v blockfile="$TMP" '
  BEGIN { while ((getline line < blockfile) > 0) block = block line "\n" }
  /<!-- STATUS:START -->/ { printf "%s", block; skip=1; next }
  /<!-- STATUS:END -->/   { skip=0; next }
  !skip { print }
' "$README" > "$NEW"
mv "$NEW" "$README"
rm -f "$TMP"

echo "✅ ${README} 현황 구간 갱신 완료 — 연속 ${streak}일째, 총 ${total_probs}문제"
