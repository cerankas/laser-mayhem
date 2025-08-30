import { avoider } from "./avoider";


export class Mirror {
  constructor(mx, my) {
    this.r = Math.min(mx, my) * .02;
    this.randomize(mx, my);
    avoider.add(this);
  }
  
  randomize(mx, my) {
    while (true) {
      const x = Math.random() * mx;
      const y = Math.random() * my;
      if (!avoider.isColliding(x, y, this.r)) {
        this.x = x;
        this.y = y;
        break;
      }
    }
    this.a = Math.random() * Math.PI;
    this.s = (.5 + Math.random() * .5) * (Math.random() > .5 ? 1 : -1) / 3;
  }

  move(dt) {
    this.a += this.s * dt;
  }

  getEnds() {
    const s = Math.sin(this.a) * this.r;
    const c = Math.cos(this.a) * this.r;

    return [
      this.x - s,
      this.y - c,
      this.x + s, 
      this.y + c
    ];
  }

  draw(ctx) {
    const [x1, y1, x2, y2] = this.getEnds();

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
}