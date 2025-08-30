import { findNearestMirrorReflection, findNearestCircleHit, projectAway, calculateReflectedAngle } from "./math";


export class Rays {
  constructor(x, y, count, depth) {
    this.x = x;
    this.y = y;
    this.depth = depth;

    this.rays = [];
    for (let i = 0; i < count; i++) this.rays.push([]);
  }

  trace(centralAngle, angleSpread, mirrors, targets, targetHitCallback) {
    const mirrorData = mirrors.map(m => [...m.getEnds(), m.a]); // [x1, y1, x2, y2, a]
    
    for (let i = 0; i < this.rays.length; i++) {
      let rayAngle = centralAngle + angleSpread * (i / this.rays.length - .5);
    
      let [x1, y1] = [this.x, this.y];
      
      const ray = this.rays[i];
      ray.length = 0;
      ray.push([x1, y1]);
            
      let depth = this.depth;
      while (true) {
        const [x2, y2] = projectAway(x1, y1, rayAngle);

        let mirrorHit = findNearestMirrorReflection(x1, y1, x2, y2, mirrorData, 1e10);
        let circleHit = findNearestCircleHit(x1, y1, x2, y2, targets, mirrorHit.distance);

        if (circleHit.intersection != null) { // circle hit, ray absorbed
          ray.push(circleHit.intersection);
          targetHitCallback(circleHit.circle, depth / this.depth);
          break;
        }

        if (mirrorHit.intersection != null) { // mirror hit, ray reflected
          ray.push(mirrorHit.intersection);
          [x1, y1] = mirrorHit.intersection;
          rayAngle = calculateReflectedAngle(rayAngle, mirrorHit.angle);
          if (--depth <= 0) break; // break at max depth
          continue; // continue if before max depth
        }

        ray.push([x2, y2]); // no hit, ray escaped screen
        break;
      }
    }
  }

  draw(ctx, hue) {
    ctx.lineWidth = 1;

    for (let i = this.depth - 1; i >= 0; i--) {
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${hue} ${100} ${50 * (1 - i / this.depth)})`;
      
      for (const ray of this.rays) {
        if (ray.length < i + 2) continue;

        ctx.moveTo(...ray[i]);
        ctx.lineTo(...ray[i+1]);
      } 

      ctx.stroke();
    }
  }
}