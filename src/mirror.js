import { avoider } from "./avoider";


export class Mirror {
  constructor(mx, my) {
    this.r = Math.min(mx, my) * .02;
    this.randomize(mx, my);
    avoider.add(this);
  }
  
  randomize(mx, my) {
    [this.x, this.y] = avoider.fit(() => [Math.random() * mx, Math.random() * my, this.r]);
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