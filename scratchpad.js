import React, { Fragment } from 'react';

const RenderedTemplate = ({ messageParts }) =>
  messageParts.map((message, index) => <Fragment key={index}>{message}</Fragment>);

function gatherMatchesForKey(template, key) {
  const variablePositions = [];
  const variablePattern = new RegExp(`{{\\s*${key}\\s*}}`);
  const match = template.match(variablePattern);
  if (match) {
    variablePositions.push({
      key,
      position: match.index,
      length: match[0].length,
    });
    const offset = match.index + match.length;
    const remainingTemplate = template.slice(offset);
    const childMatches = gatherMatchesForKey(remainingTemplate, key);
    childMatches.forEach((childMatch) => {
      variablePositions.push({
        key,
        position: childMatch.position + offset,
        length: childMatch.length,
      });
    });
  }
  return variablePositions;
}

function renderTemplate(template, params) {
  const variablePositions = Object.keys(params)
    .map(key => gatherMatchesForKey(template, key))
    .reduce((result, keyMatches) => result.concat(keyMatches), [])
    .sort((p1, p2) => p1.position - p2.position);
  const result = [];
  let remainingOffset = 0;
  variablePositions.forEach(({ key, position, length }) => {
    result.push(template.slice(remainingOffset, position));
    result.push(params[key]);
    remainingOffset = position + length;
  });
  const leftover = template.slice(remainingOffset);
  if (leftover.length) {
    result.push(leftover);
  }
  return result;
}
