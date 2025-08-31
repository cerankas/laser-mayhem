export class Ghost {
  constructor(x, y, r, hue, delta) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.hue = hue;
    this.delta = delta;
    this.intensity = 50;
    this.terminated = false;
  }

  update(dt) {
    this.y += this.delta * dt * 500;
    this.delta *= 1 + 5 * dt;
    this.intensity -= dt * 100;
    if (this.intensity < 0) this.terminated = true;
  }

  draw(ctx) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = `hsl(${this.delta < 0 ? this.hue : this.hue + 180} 100 ${this.intensity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r + 1.5, 0, 2*Math.PI);
    ctx.fill();
  }
}