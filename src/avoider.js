import { distanceSquared } from "./math";


class Avoider {
  constructor() {
    this.objects = [];
    this.margin = 2;
  }

  add(newObject) {
    this.objects.push(newObject);
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