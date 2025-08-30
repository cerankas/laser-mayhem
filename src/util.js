export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.height = document.body.clientHeight;
  canvas.width = document.body.clientWidth;
  const ctx = canvas.getContext('2d');
  
  return ctx;
}


export function clearCanvas(ctx) { 
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.stroke();
}