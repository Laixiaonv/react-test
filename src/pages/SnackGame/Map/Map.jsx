class GameMap {
  constructor(el, rect = 10) {
    this.el = el;
    this.rect = rect;
    this.data = []
    this.rows = Math.ceil(GameMap.getStyle(el, 'height') / rect);
    this.cells = Math.ceil(GameMap.getStyle(el, 'width') / rect);
    GameMap.setStyle(el, 'height', this.rows * rect)
    GameMap.setStyle(el, 'width', this.cells * rect)
  }

  static getStyle(el, attr) {
    return parseFloat(getComputedStyle(el)[attr])
  }

  static setStyle(el, attr, val) {
    el.style[attr] = val + 'px';
  }

  setData = (newData) => {
    this.data = this.data.concat(newData);
  }

  renderPoint = () => {
    this.el.innerHTML = this?.data?.map((item, index) => {
      return `<span 
        style="
          position:absolute;
          left:${item.x*this.rect}px;
          top:${item.y*this.rect}px;
          width:${this.rect}px;
          height:${this.rect}px;
          background:${item.color};
        "></span>`
    }).join("");
      
  }

  include = ({ x, y }) => {
    return !!this.data.some((item) => item.x === x && item.y === y )
  }

  clearData = () => {
    this.data = []
  }
}

export default GameMap;
