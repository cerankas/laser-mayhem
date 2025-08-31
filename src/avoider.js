import { distanceSquared } from "./math";


class Avoider {
  constructor() {
    this.objects = [];
    this.margin = 2;
    this.retryLimit = 100;
  }

  add(newObject) {
    this.objects.push(newObject);
  }

  fit(randomize, condition = null) {
    let retryCount = 0;
    while (true) {
      const [x, y, r] = randomize();
      if (++retryCount > this.retryLimit) return [x, y, r];
      if (this.isColliding(x, y, r)) continue;
      if (condition != null && !condition(x, y, r)) continue;
      return [x, y, r];
    }
  }

  isColliding(x, y, r) {
    for (const object of this.objects) {
      const distance = distanceSquared(x, y, object.x, object.y)**.5;
      if (distance + this.margin < r + object.r) return true;
    }
    return false;
  }
}


export const avoider = new Avoider();