class FutbolPlayer {
  constructor(aName, aCity) {
    this.name = aName;
    this.city = aCity;
  }

  getName(){
    return this.name;
  }

  getCity(){
    return this.city;
  }
}

module.exports = FutbolPlayer;
