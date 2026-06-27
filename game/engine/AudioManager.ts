import { Howl } from "howler";
import * as Sounds from "@/utils/audio";

export class AudioManager {
  private static sounds: Record<string, Howl> = {};
  private static masterVolume: number = 0.5;
  private static isMuted: boolean = false;

  static init() {
    if (Object.keys(this.sounds).length > 0) return;

    const soundGens: Record<string, () => string> = {
      coin: Sounds.generateCoin,
      correct: Sounds.generateCorrect,
      wrong: Sounds.generateWrong,
      powerup: Sounds.generatePowerUp,
      ghost: Sounds.generateGhost,
      menu: Sounds.generateBeep,
      victory: Sounds.generateVictory,
      gameover: Sounds.generateWrong,
    };

    for (const [name, gen] of Object.entries(soundGens)) {
      this.sounds[name] = new Howl({
        src: [gen()],
        format: ["wav"],
        volume: this.masterVolume,
      });
    }
  }

  static play(name: string) {
    if (this.isMuted) return;
    const sound = this.sounds[name];
    if (sound) {
      sound.play();
    }
  }

  static setMasterVolume(volume: number) {
    this.masterVolume = volume;
    for (const sound of Object.values(this.sounds)) {
      sound.volume(volume);
    }
  }

  static toggleMute(muted: boolean) {
    this.isMuted = muted;
    for (const sound of Object.values(this.sounds)) {
      sound.mute(muted);
    }
  }
}
