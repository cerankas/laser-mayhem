export class ChargeSound {
  constructor() {
    this.audioCtx = new window.AudioContext();

    this.osc = this.audioCtx.createOscillator();
    this.osc.type = "sawtooth";

    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0;

    this.lfo = this.audioCtx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.value = 20;

    this.lfoGain = this.audioCtx.createGain();
    this.lfoGain.gain.value = 100;

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.osc.frequency);

    this.osc.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);

    this.osc.start();
    this.lfo.start();

    document.addEventListener("visibilitychange", () => { if (document.hidden) this.audioCtx.suspend(); else this.audioCtx.resume(); });
  }

  update(pitch, volume) {
    const now = this.audioCtx.currentTime;

    this.osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, pitch),
      now + 0.05
    );

    this.gainNode.gain.linearRampToValueAtTime(
      Math.max(0, Math.min(1, volume)),
      now + 0.05
    );
  }
}
