jest.unmock('../src/model/FutbolPlayer');

describe('FutbolPlayer', () => {
  it('can get the name', () => {
    const name = "aName";
    const fp = require('../src/model/FutbolPlayer');
    fp.name = name;

    expect(fp.getName()).toBe(name);
  });

  it('can get the city', () => {
    const city = "aCity";
    const fp = require('../src/model/FutbolPlayer');
    fp.city = city;

    expect(fp.getCity()).toBe(city);
  });
});
