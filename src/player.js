import { clamp } from "./util";

export class Player {
  constructor(mx, my) {
    this.mx = mx;
    this.my = my;

    this.x = mx / 2;
    this.y = my / 2;

    this.r = 20;
    this.speed = 200;

    this.keys = [];

    document.addEventListener('keydown', e => {
      this.keys[e.key] = 1;
    });

    document.addEventListener('keyup', e => {
      this.keys[e.key] = 0;
    });
  }

  move(dt) {
    const delta = dt * this.speed;
    const keys = this.keys;
    if (keys['w'] || keys['ArrowUp']) this.y -= delta;
    if (keys['s'] || keys['ArrowDown']) this.y += delta;
    if (keys['a'] || keys['ArrowLeft']) this.x -= delta;
    if (keys['d'] || keys['ArrowRight']) this.x += delta;
    this.x = clamp(this.x, 0, this.mx);
    this.y = clamp(this.y, 0, this.my);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.stroke();
  }
}
