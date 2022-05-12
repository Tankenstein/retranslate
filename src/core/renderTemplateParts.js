import { gatherKeys } from './gatherKeys';

export const renderTemplateParts = (template, params) => {
  const positions = gatherKeys(template);
  const lastPosition = positions[positions.length - 1];
  const lastOffset = lastPosition ? lastPosition.position + lastPosition.length : 0;

  return positions
    .flatMap(({ key, offset, position }) => [
      { dangerous: false, value: template.slice(offset, position) },
      { dangerous: true, value: params[key] },
    ])
    .concat([{ dangerous: false, value: template.slice(lastOffset) }])
    .filter(({ value }) => value);
};
