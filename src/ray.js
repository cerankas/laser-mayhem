import { trace } from "./trace";
import { atan, projectAway } from "./util";

export class Ray {
  constructor() {
    this.sections = null;

    this.x1 = 0;
    this.y1 = 0;

    this.x2 = 0;
    this.y2 = 0;

    document.addEventListener('mousemove', e => {
      this.x2 = e.offsetX;
      this.y2 = e.offsetY;
    });
  }

  trace(x, y, mirrors, depth, delta) {
    this.x1 = x;
    this.y1 = y;

    const a = atan(x, y, this.x2, this.y2);

    this.sections = trace(x, y, a + delta, mirrors, depth);
  }

  draw(ctx) {
    ctx.lineWidth = 1;
    // ctx.strokeStyle = this.sections.length > 1 ? 'red' : 'white';
    
    
    let lx = this.x1;
    let ly = this.y1;
    ctx.moveTo(this.x1, this.y1);
    
    let n = this.sections.length;
    for (const section of this.sections) {
      const [x, y] = section;
      const v = (255 * n / this.sections.length) | 0;
      ctx.strokeStyle = `rgba(${v},${0},${0},1)`
      n -= .8;
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
      lx = x;
      ly = y;
    } 

    
    // ctx.beginPath();
    // ctx.strokeStyle = 'white';
    // ctx.strokeText(`${this.sections.length - 1}`, 10, 10);
  }
}