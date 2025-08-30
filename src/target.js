export class Target {
  constructor(mx, my) {
    this.r = 20;
    this.randomize(mx, my)
  }

  randomize(mx, my) {
    this.x = Math.random() * mx;
    this.y = Math.random() * my;
    this.hue = Math.random() * 360;
    this.charge = 0;
  }

  absorb(hue, energy) {
    let delta = ((this.hue - hue) % 360 + 360) % 360; // range (0,360), 0 = equal
    if (delta >  180) delta = 360 - delta; // range (0,180), absolute difference
    delta = (90 - delta) / 90; // range (-1,1), 1 = equal
    this.charge += delta * energy;
  }

  draw(ctx) {
    if (this.charge != 0) {
      ctx.fillStyle = `hsl(${this.charge > 0 ? this.hue : this.hue + 180} 100 50)`;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x, this.y, this.r-3, -Math.PI/2, -Math.PI/2 + this.charge * 2 * Math.PI / 100, this.charge < 0);
      ctx.lineTo(this.x, this.y);
      ctx.fill();
    }

    ctx.lineWidth = 3;
    ctx.strokeStyle = `hsl(${this.hue} 100 50)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r - 1.5, 0, 2*Math.PI);
    ctx.stroke();
  }
}