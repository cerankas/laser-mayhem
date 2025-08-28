export const clamp = (v, min, max) => v < min ? min : v > max ? max : v;


export function clear(ctx) { 
  ctx.fillStyle = '#404040';
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.stroke();
}


export function init() {
  const canvas = document.getElementById('canvas');
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
  // canvas.width = document.clientWidth;
  const ctx = canvas.getContext('2d');
  
  return ctx;
}


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