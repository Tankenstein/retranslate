export const gatherKeys = template => {
  const variablePositions = [];
  const variablePattern = /{{\s*(?<key>\w+)\s*}}/g;
  let match;
  let offset = 0;

  // eslint-disable-next-line no-cond-assign
  while ((match = variablePattern.exec(template))) {
    const { index: position, groups } = match;
    const { key } = groups;
    const { length } = match[0];

    variablePositions.push({
      key,
      offset,
      position,
      length,
    });

    offset = position + length;
  }

  return variablePositions;
};
