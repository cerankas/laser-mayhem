import { atan } from "./math";

export class DirectionControl {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.angle = 0;

    document.addEventListener('pointermove', e => {
      this.angle = atan(this.x, this.y, e.offsetX, e.offsetY);
    });
  }
}