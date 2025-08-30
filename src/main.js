import { initCanvas, clearCanvas } from "./util";
import { DirectionControl } from "./directionControl";
import { Rays } from "./rays";
import { Mirrors } from "./mirrors";
import { Targets } from "./targets";

const ctx = initCanvas();

const [width, height] = [ctx.canvas.width, ctx.canvas.height];

const directionControl = new DirectionControl(width/2, height/2)

const rays = new Rays(width/2, height/2, 100, 10);

const mirrors = new Mirrors(200, width, height);

const targets = new Targets(width, height, 10);

let pause = false;

document.addEventListener('keypress', e => {
  if (e.key == 'p') pause = !pause;
})

let hue = 0;
let last = 0;

function animate(t) {
  const dt = (t - last) / 1000;
  last = t;

  if (!pause) hue += dt * 20;
  
  clearCanvas(ctx);

  if (!pause) mirrors.move(dt / 2);
  
  rays.trace(directionControl.angle, Math.PI/180 * 3, mirrors.mirrors, targets.targets, (target, charge) => { target.absorb(hue, charge * dt) });
  
  targets.updateHits(width, height);

  rays.draw(ctx, hue);
  
  mirrors.draw(ctx);

  targets.draw(ctx);

  targets.drawScore(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);