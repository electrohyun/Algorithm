function findGroupIndex(groups, number) {
  return groups.findIndex((group) => group.includes(number));
}

function connector(input) {
  const edgeCount = input[1];
  const groups = [];

  for (let i = 0; i < edgeCount; i++) {
    const [a, b] = input[2 + i];

    const aGroupIndex = findGroupIndex(groups, a);
    const bGroupIndex = findGroupIndex(groups, b);

    // 둘 다 어떤 그룹에도 없음
    if (aGroupIndex === -1 && bGroupIndex === -1) {
      groups.push([a, b]);
    }

    // a만 그룹에 있음
    else if (aGroupIndex !== -1 && bGroupIndex === -1) {
      groups[aGroupIndex].push(b);
    }

    // b만 그룹에 있음
    else if (aGroupIndex === -1 && bGroupIndex !== -1) {
      groups[bGroupIndex].push(a);
    }

    // 둘 다 그룹에 있는데, 서로 다른 그룹이면 합치기
    else if (aGroupIndex !== bGroupIndex) {
      groups[aGroupIndex].push(...groups[bGroupIndex]);
      groups.splice(bGroupIndex, 1);
    }

    // 둘 다 같은 그룹에 있으면 아무것도 안 함
  }

  return groups;
}

function findAnswer(groups) {
  const groupWithOne = groups.find((group) => group.includes(1));

  if (!groupWithOne) return 0;

  return groupWithOne.length - 1;
}

function solution(input) {
  const groups = connector(input);
  return findAnswer(groups);
}
