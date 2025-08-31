import { atan } from "./math";

export class Control {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.angle = 0;
    this.pause = true;
    this.hue = 0;
    
    document.addEventListener('pointerdown', this.pointerEventHandler);
    document.addEventListener('pointermove', this.pointerEventHandler);

    document.addEventListener('keypress', e => {
      if (e.key == ' ') this.pause = !this.pause;
    });
  }
  
  pointerEventHandler = e => {
    this.angle = atan(this.x, this.y, e.offsetX, e.offsetY);
  }

  updateHue(dt) {
    this.hue += dt * 20;
  }
}