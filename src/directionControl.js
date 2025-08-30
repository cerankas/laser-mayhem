import { atan } from "./math";

export class DirectionControl {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.angle = 0;

    document.addEventListener('pointerdown', this.pointerEventHandler);
    document.addEventListener('pointermove', this.pointerEventHandler);
  }
  
  pointerEventHandler = e => {
    this.angle = atan(this.x, this.y, e.offsetX, e.offsetY);
  }
}