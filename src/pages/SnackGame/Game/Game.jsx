import Foods from '../Foods';
import Snack from '../Snack';
import Map from '../Map';

class Game {
  constructor(el, rect, toControl = null) {

    this.gameMap = new Map(el, rect);
    this.gameFoods = new Foods(this.gameMap);
    this.gameSnack = new Snack(this.gameMap, this.gameFoods);
    this.timer = 0;
    this.interval = 200;
    this.toControl = toControl;
    this.control();
  }

  start = () => {
    this.move()
  }

  stop = () => {
    clearInterval(this.interval);
  }

  move = () => {
    this.stop();
    this.timer = setInterval(() => {
      this.gameSnack.move();
      this.gameMap.clearData();
      if (this.isEat()) {
        console.log('eateat')
        this.gameSnack.eatFood();
        this.gameFoods.create();
      }
      this.gameMap.setData(this.gameSnack.data);
      this.gameMap.setData(this.gameFoods.data);
      this.gameMap.renderPoint();
      if(this.isOver()){
        this.over(0);
        return;
      }
    }, this.interval);
  }

  isEat = () => {
    return (this.gameSnack.data[0].x === this.gameFoods.data.x) && this.gameSnack.data[0].y === this.gameFoods.data.y;
  }

  isOver = () => {
    // 判断蛇出地图
    const { x, y } = this.gameSnack.data[0];
    if (
      x < 0 ||
      x >= this.gameMap.cells ||
      y < 0 ||
      y >= this.gameMap.rows
    ) {
      return true;
    }

    for (let i = 1; i < this.gameSnack.data.length; i++) {
      if( x === this.gameSnack.data[i].x && y === this.gameSnack.data[i].y)
      return true;
    }

    return false;
  }

  over = (overState = 0 ) => {
    if (overState) {
      this.toWin();
    } else {
      this.toOver();
    }
  }

  toOver = () => {
    alert('游戏结束');
    this.gameMap.clearData();
    this.gameMap.renderPoint();
  }

  toWin = () => {
    alert('Win!!!')
  }

  keyDown = ({keyCode}) => {
    console.log('keyCode', keyCode)
    switch(keyCode) {
      case 37:
        this.gameSnack.changeDir('left')
      break;
      case 38:
        this.gameSnack.changeDir('top')
      break;
      case 39:
        this.gameSnack.changeDir('right')
      break;
      case 40:
        this.gameSnack.changeDir('bottom')
      break;
      default:
      break;
    }
  }

  control = () => {
    if (this.toControl) {
      this.toControl();
      return;
    }
    window.addEventListener('keydown', this.keyDown)
  }

  // 自定义控制
  addControl = (fn) => {
    fn.call(this)
    window.removeEventListener('keydown', this.keyDown)
  }
}

export default Game;