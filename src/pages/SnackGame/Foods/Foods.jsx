
class GameFoods {
  constructor(gameMap) {
    this.gameMap = gameMap;
    this.data = {};
    this.create();
  }

  create = () => {
    const x = Math.floor(Math.random() * this.gameMap?.cells);
    const y = Math.floor(Math.random() * this.gameMap?.rows);
    const color = 'red';
    this.data = {
      x, y, color
    }
    if (this.gameMap?.include(this.data)) {
      this.create()
    }

    this.gameMap?.setData(this?.data)
    
  }
}

export default GameFoods;