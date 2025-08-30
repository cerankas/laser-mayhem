export class Mirror {
  constructor(mx, my) {
    this.randomize(mx, my);
  }
  
  randomize(mx, my) {
    this.x = Math.random() * mx;
    this.y = Math.random() * my;
    this.a = Math.random() * Math.PI;
    this.r = 30 + Math.random() * 10;
    this.s = (.5 - Math.random()) * 1;    
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