import { Target } from "./target";

export class Targets {
  constructor(mx, my, count) {
    this.score = 0;
    this.targets = [];
    for (let i = 0; i < count; i++) this.targets.push(new Target(mx, my));
  }

  updateHits(mx, my) {
    for (const target of this.targets) {
      target.updateSound();
      if (target.charge > 100) {
        this.score++;
        target.randomize(mx, my);
      }
      if (target.charge < -100) {
        this.score--;
        target.randomize(mx, my);
      }
    }
  }

  mute() {
    for (const target of this.targets) target.sound.update(1000,0);
  }
  
  draw(ctx) {
    for (const target of this.targets) target.draw(ctx);
  }

  drawScore(ctx) {
    ctx.font = '30px arial'
    ctx.fillStyle = 'white';
    ctx.fillText('score: ' + this.score, 10, 30);
  }
}