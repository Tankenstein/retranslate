import { renderTemplateParts } from './renderTemplateParts';

describe('renderTemplateParts', () => {
  it('should render single key', () => {
    const given = { template: '{{from}}', params: { from: 'Egypt' } };
    const when = renderTemplateParts(given.template, given.params);
    const then = [{ dangerous: true, value: 'Egypt' }];

    expect(when).toEqual(then);
  });

  it('should render the key twice and the text between the occurrences', () => {
    const given = {
      template: '{{destination}} ... {{destination}}',
      params: { destination: 'United Kingdom' },
    };

    const when = renderTemplateParts(given.template, given.params);
    const then = [
      { dangerous: true, value: 'United Kingdom' },
      { dangerous: false, value: ' ... ' },
      { dangerous: true, value: 'United Kingdom' },
    ];

    expect(when).toEqual(then);
  });

  it('should render multiple keys and the text between them', () => {
    const given = {
      template: '{{destination}} ... {{from}}',
      params: { destination: 'United Kingdom', from: 'Egypt' },
    };

    const when = renderTemplateParts(given.template, given.params);
    const then = [
      { dangerous: true, value: 'United Kingdom' },
      { dangerous: false, value: ' ... ' },
      { dangerous: true, value: 'Egypt' },
    ];

    expect(when).toEqual(then);
  });

  it('should render all the keys and the whole template', () => {
    const given = {
      template: '{{destination}} ... {{from}} and {{ to }} then {{where}} {{to}} again',
      params: {
        destination: 'United Kingdom',
        from: 'Egypt',
        where: 'London',
        to: 'Tallinn',
      },
    };

    const when = renderTemplateParts(given.template, given.params);
    const then = [
      { dangerous: true, value: 'United Kingdom' },
      { dangerous: false, value: ' ... ' },
      { dangerous: true, value: 'Egypt' },
      { dangerous: false, value: ' and ' },
      { dangerous: true, value: 'Tallinn' },
      { dangerous: false, value: ' then ' },
      { dangerous: true, value: 'London' },
      { dangerous: false, value: ' ' },
      { dangerous: true, value: 'Tallinn' },
      { dangerous: false, value: ' again' },
    ];

    expect(when).toEqual(then);
  });
});
