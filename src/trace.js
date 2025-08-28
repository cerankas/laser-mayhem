import { atan, projectAway } from "./util";

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);

  if (!denom) return null;
  
  const ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3)) / denom;
  const ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3)) / denom;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

  const xi = x1 + ua * (x2 - x1);
  const yi = y1 + ua * (y2 - y1);
  
  return [xi, yi, (x1-xi)**2 + (y1-yi)**2, x3, y3, x4, y4];
}


function reflex(a, b) {
  const c = b + Math.PI / 2;
  const d = 2 * (c - a);
  const e = a + d;
  return e - Math.PI;
}


export function trace(x, y, a, mirrors, depth) {
  const [x2, y2] = projectAway(x, y, a);

  const intersections = [];

  for (const mirror of mirrors) {
    const [x3, y3, x4, y4] = mirror.getEnds();
    const intersection = intersect(x, y, x2, y2, x3, y3, x4, y4);
    if (intersection == null) continue;
    if (intersection[2] < 1e-5) continue;
    intersections.push(intersection);
  }

  if (!intersections.length) return [[x2, y2]];
  
  intersections.sort((i1, i2) => {
    if (i1[2] < i2[2]) return -1;
    if (i1[2] > i2[2]) return 1;
    return 0;
  });
  
  const [xi, yi, d, x3, y3, x4, y4] = intersections[0];
  const mi = atan(x3, y3, x4, y4);
  const ai = reflex(a, mi);
  
  if (depth <= 0) return [[xi, yi]];

  return [[xi, yi], ...trace(xi, yi, ai, mirrors, depth - 1)];
}