import { Mirror } from "./mirror";


export class Mirrors {
  constructor(mx, my, count) {
    this.mirrors = [];
    
    for (let i = 0; i < count; i += 1) {
      this.mirrors.push(new Mirror(mx, my));
    }
  }

  move(dt) {
    for (const mirror of this.mirrors) mirror.move(dt);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    for (const mirror of this.mirrors) mirror.draw(ctx);
    ctx.stroke();
  }
}