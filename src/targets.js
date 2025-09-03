import { Ghost } from "./ghost";
import { scoreSound } from "./sound";
import { Target } from "./target";

export class Targets {
  constructor(mx, my, count) {
    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem('bestScore') ?? '0');

    this.targets = [];
    this.ghosts = [];
    
    for (let i = 0; i < count; i++) this.targets.push(new Target(mx, my));
  }

  updateScore(delta) {
    this.score += delta;
    document.getElementById('score').innerHTML = `&nbsp;Score: ${this.score}`;
    
    if (this.bestScore < this.score) {
      this.bestScore = this.score;
      localStorage.setItem('bestScore', this.score);
    }
  }

  updateHits(mx, my) {
    for (const target of this.targets) {
      target.updateSound();
      if (target.charge > 100) {
        this.updateScore(1);
        scoreSound(1);
        this.ghosts.push(new Ghost(target.x, target.y, target.r, target.hue, -1));
        target.randomize(mx, my);
      }
      if (target.charge < -100) {
        this.updateScore(-1);
        scoreSound(-1);
        this.ghosts.push(new Ghost(target.x, target.y, target.r, target.hue, 1));
        target.randomize(mx, my);
      }
    }
  }

  updateGhosts(dt) {
    for (const ghost of this.ghosts) ghost.update(dt);
    this.ghosts = this.ghosts.filter(ghost => !ghost.terminated);
  }

  mute() {
    for (const target of this.targets) target.sound?.update(1000,0);
  }
  
  draw(ctx) {
    for (const target of this.targets) target.draw(ctx);
    for (const ghost of this.ghosts) ghost.draw(ctx);
  }
}