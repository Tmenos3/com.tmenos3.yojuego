jest.unmock('../src/model/FutbolPlayer');

describe('FutbolPlayer', () => {
  it('create a FutbolPlayer with a name', () => {
    const name = "aName";
    const fp = require('../src/model/FutbolPlayer');
    fp.setName(name);
    expect(fp.getName()).toBe(name);
  });
});
