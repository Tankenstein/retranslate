import { gatherKeys } from './gatherKeys';

describe('gatherKeys', () => {
  it('should match the key once', () => {
    const given = '{{from}}';
    const when = gatherKeys(given);
    const then = [{ key: 'from', position: 0, offset: 0, length: 8 }];

    expect(when).toEqual(then);
  });

  it('should ignore spaces in the curly braces', () => {
    const given = '{{ from }}';
    const when = gatherKeys(given);
    const then = [{ key: 'from', position: 0, offset: 0, length: 10 }];

    expect(when).toEqual(then);
  });

  it('should match the key twice', () => {
    const given = '{{destination}} ... {{destination}}';
    const when = gatherKeys(given);
    const then = [
      { key: 'destination', position: 0, offset: 0, length: 15 },
      { key: 'destination', position: 20, offset: 15, length: 15 },
    ];

    expect(when).toEqual(then);
  });

  it('should match multiple keys', () => {
    const given = '{{destination}} ... {{from}}';
    const when = gatherKeys(given);
    const then = [
      { key: 'destination', position: 0, offset: 0, length: 15 },
      { key: 'from', position: 20, offset: 15, length: 8 },
    ];

    expect(when).toEqual(then);
  });

  it('should match all the keys', () => {
    const given = '{{destination}} ... {{from}} and {{ to }} then {{where}} {{to}} again';
    const when = gatherKeys(given);
    const then = [
      { key: 'destination', position: 0, offset: 0, length: 15 },
      { key: 'from', position: 20, offset: 15, length: 8 },
      { key: 'to', offset: 28, position: 33, length: 8 },
      { key: 'where', offset: 41, position: 47, length: 9 },
      { key: 'to', offset: 56, position: 57, length: 6 },
    ];

    expect(when).toEqual(then);
  });
});
