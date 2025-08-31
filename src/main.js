import { initCanvas, clearCanvas } from "./util";
import { avoider } from "./avoider";
import { Control } from "./control";
import { Rays } from "./rays";
import { Mirrors } from "./mirrors";
import { Targets } from "./targets";
import { audioMute } from "./sound";


const ctx = initCanvas();

const [width, height] = [ctx.canvas.width, ctx.canvas.height];
avoider.add({x: width/2, y: height/2, r: Math.min(width, height) * .05});

const control = new Control(width/2, height/2);
const rays = new Rays(width/2, height/2, 100, 10);
const mirrors = new Mirrors(width, height, 100 * Math.max(width, height) / Math.min(width, height));
const targets = new Targets(width, height, 10);

document.getElementById('play-button').addEventListener('click', () => control.pause = false);
document.getElementById('pause-button').addEventListener('click', () => control.pause = true);
document.getElementById('sound-button').addEventListener('click', (e) => { 
  audioMute.state = !audioMute.state; 
  e.target.innerHTML = `&nbsp;Sound: ${audioMute.state ? 'off' : 'on'}&nbsp;`; 
});

let lastTime = 0;

function animate(currentTime) {
  const dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  document.getElementById('pause-overlay').style.display = control.pause ? 'flex' : 'none';

  clearCanvas(ctx);

  if (!control.pause) {
    if (Math.random() < dt) mirrors.mirrors[Math.random() * (mirrors.mirrors.length - .1) | 0].randomize(width, height);
    control.updateHue(dt);
    mirrors.move(dt);
    rays.trace(control.angle, Math.PI/180 * 3, mirrors.mirrors, targets.targets, (target, charge) => { target.absorb(control.hue, charge * dt, targets.score) });
    targets.updateHits(width, height);
    targets.updateGhosts(dt);
  }
  else {
    targets.mute();
  }

  rays.draw(ctx, control.hue);
  mirrors.draw(ctx);
  targets.draw(ctx);
  targets.drawScore(ctx);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);