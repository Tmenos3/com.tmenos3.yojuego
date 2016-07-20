import FutbolPlayer from '../src/model/FutbolPlayer';

jest.dontmock('../src/model/FutbolPlayer');

describe('FutbolPlayer', () => {
  it('create a FutbolPlayer with a name', () => {
    const name = "aName";
    const fp = new FutbolPlayer(name);
    expect(fp.getName()).toBe(name);
  });

  it('create a FutbolPlayer with a city', () => {
    const city = "aCity";
    const fp = new FutbolPlayer("aName", city);
    expect(fp.getCity()).toBe(city);
  });
});
