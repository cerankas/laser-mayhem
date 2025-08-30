export const clamp = (v, min, max) => v < min ? min : v > max ? max : v;


export const inOrder = (a, b, c) => (a <= b && b <= c) || (a >= b && b >= c);


export function atan(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  const a = Math.atan2(dx, dy);
  return a;
}


export function projectAway(x, y, a) {
  const s = Math.sin(a) * 10000;
  const c = Math.cos(a) * 10000;

  const x2 = x + s;
  const y2 = y + c;

  return [x2, y2];
}


export const calculateReflectedAngle = (incidenceAngle, reflectingSurfaceAngle) => 2 * reflectingSurfaceAngle - incidenceAngle;


export const distanceSquared = (x1, y1, x2, y2) => (x2-x1)**2 + (y2-y1)**2;


export function intersectTwoLineSegments(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (!denom) return null;

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;

  const xi = x1 + ua * (x2 - x1);
  const yi = y1 + ua * (y2 - y1);

  return [xi, yi];
}


export function intersectLineSegmentWithCircle(x1, y1, x2, y2, xc, yc, r) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dr2 = dx**2 + dy**2;
  const D = (x1-xc) * (y2-yc) - (x2-xc) * (y1-yc);
  const delta = (r**2 * dr2) - D**2;

  if (delta < 0) return null;

  const deltaRoot = delta**.5;

  const xi1 = xc + ( D * dy + dx * deltaRoot) / dr2;
  const xi2 = xc + ( D * dy - dx * deltaRoot) / dr2;
  const yi1 = yc + (-D * dx + dy * deltaRoot) / dr2;
  const yi2 = yc + (-D * dx - dy * deltaRoot) / dr2;

  let result = [];
  if (inOrder(x1, xi1, x2) && inOrder(y1, yi1, y2)) result.push([xi1, yi1]);
  if (inOrder(x1, xi2, x2) && inOrder(y1, yi2, y2)) result.push([xi2, yi2]);

  if (result.length == 0) return null;
  if (result.length == 1) return result[0];

  return distanceSquared(x1, y1, ...result[0]) < distanceSquared(x1, y1, ...result[1]) ? result[0] : result[1];
}


export function findNearestMirrorReflection(x1, y1, x2, y2, mirrorData, distanceRange) {
  let foundDistance = distanceRange;
  let foundIntersection = null;
  let foundMirrorAngle = null;
  
  for (const [x3, y3, x4, y4, mirrorAngle] of mirrorData) {
    const intersection = intersectTwoLineSegments(x1, y1, x2, y2, x3, y3, x4, y4);
    
    if (intersection == null) continue;
    
    const distance = distanceSquared(x1, y1, ...intersection);
    
    if (distance < 1e-5) continue;
    if (distance > foundDistance) continue;
    
    foundDistance = distance;
    foundIntersection = intersection;
    foundMirrorAngle = mirrorAngle;
  }
  
  return {distance: foundDistance, intersection: foundIntersection, angle: foundMirrorAngle};
}


export function findNearestCircleHit(x1, y1, x2, y2, circles, distanceRange) {
  let foundDistance = distanceRange;
  let foundIntersection = null;
  let foundCircle = null;

  for (const circle of circles) {
    const {x, y, r} = circle;
    const intersection = intersectLineSegmentWithCircle(x1, y1, x2, y2, x, y, r);
    
    if (intersection == null) continue;
    
    const distance = distanceSquared(x1, y1, ...intersection);
    
    if (distance > foundDistance) continue;
    
    foundDistance = distance;
    foundIntersection = intersection;
    foundCircle = circle;
  }

  return {distance: foundDistance, intersection: foundIntersection, circle: foundCircle};
}