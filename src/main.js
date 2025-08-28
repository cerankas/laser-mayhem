import { Mirrors } from "./mirrors";
import { Player } from "./player";
import { Ray } from "./ray";
import { clear, init } from "./util";

const ctx = init();

const mirrors = new Mirrors(500, ctx.canvas.width, ctx.canvas.height);

const player = new Player(ctx.canvas.width, ctx.canvas.height);

const ray = new Ray();

let pause = false;
document.addEventListener('keypress', e => {
  if (e.key == ' ') pause = !pause;
})

requestAnimationFrame(animate);

let last = 0;

function animate(t) {

  const dt = (t - last) / 1000;
  last = t;
  
  clear(ctx);

  if (!pause) mirrors.move(dt / 20);
  
  ctx.stroke();
  
  player.move(dt);
  
  const n = 100;
  for (let d = -n/2; d <= n/2; d += 1) {
    ray.trace(player.x, player.y, mirrors.mirrors, 10, d / n / 10);
    ray.draw(ctx);
  }
  
  mirrors.draw(ctx);
  player.draw(ctx);
  
  requestAnimationFrame(animate);
}