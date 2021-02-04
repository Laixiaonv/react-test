class SnackGame {
  constructor(gameMap, gameFoods) {
    this.gameMap = gameMap;
    this.gameFoods = gameFoods;
    this.data = [
      {x: 0, y: 0, color: 'white'},
      {x: 1, y: 0, color: 'white'},
    ]
    this.direction = 'right'
    this.gameMap?.setData(this.data)
  }

  move = () => {
    let i = this.data.length-1;
    this.lastData = {
        x: this.data[i].x,
        y: this.data[i].y,
        color: this.data[i].color
    }
    /*让后边每一格走到前一格的位置上*/
    for(i; i > 0; i--){
        this.data[i].x = this.data[i-1].x;
        this.data[i].y = this.data[i-1].y;
    }

    switch(this.direction) {
      case 'left':
        this.data[0].x--;
      break;
      case 'right':
        this.data[0].x++;
      break;
      case 'top':
        this.data[0].y--;
      break;
      case 'bottom':
        this.data[0].y++;
      break;
      default:
        break;
    }
  }

  changeDir = (dir) => {
    // 本身左右移动，只能修改上下移动
    if (['left', 'right'].includes(this.direction)) {
      if (['left', 'right'].includes(dir)) return false;
    } else {
      // 本身上下移动，只能修改左右移动
      if (['top', 'bottom'].includes(dir)) return false;
    }
    this.direction = dir;
  }

  eatFood = () => {
    this.data.push(this.lastData);
  }
}

export default SnackGame;