let audioCtx = null;

document.addEventListener("visibilitychange", () => { if (document.hidden) audioCtx?.suspend(); else audioCtx?.resume(); });

export class ChargeSound {
  constructor() {
    if (audioCtx ==  null) audioCtx = new window.AudioContext();

    this.osc = audioCtx.createOscillator();
    this.osc.type = "sawtooth";

    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = 0;

    this.lfo = audioCtx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.value = 20;

    this.lfoGain = audioCtx.createGain();
    this.lfoGain.gain.value = 100;

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.osc.frequency);

    this.osc.connect(this.gainNode);
    this.gainNode.connect(audioCtx.destination);

    this.osc.start();
    this.lfo.start();

  }

  update(pitch, volume) {
    const now = audioCtx.currentTime;
    this.osc.frequency.exponentialRampToValueAtTime(Math.max(20, pitch), now + 0.05);
    this.gainNode.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, volume)) * .5, now + 0.05);
  }
}


export function scoreSound(delta) {
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  osc.type = "triangle";

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, now);

  gainNode.gain.linearRampToValueAtTime(1, now + 0.05);

  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  if (delta > 0) {
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
  }
  else {
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
  }

  const lfo = audioCtx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 60;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 120;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.55);

  lfo.start(now);
  lfo.stop(now + 0.55);

  osc.onended = () => {
    osc.disconnect();
    lfo.disconnect();
    lfoGain.disconnect();
    gainNode.disconnect();
  };
}
