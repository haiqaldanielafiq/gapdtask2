/**
 * Generates sound effects as base64 WAV data URIs.
 */

function createWavDataUri(samples: Float32Array): string {
  const numChannels = 1;
  const sampleRate = 44100;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = samples.length * blockAlign;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF identifier
  view.setUint32(0, 0x52494646, false); // "RIFF"
  view.setUint32(4, 36 + dataSize, true);
  view.setUint32(8, 0x57415645, false); // "WAVE"

  // "fmt " chunk
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // "data" chunk
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, dataSize, true);

  // Write samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  const blob = new Blob([buffer], { type: "audio/wav" });
  return URL.createObjectURL(blob);
}

function tone(freq: number, duration: number, type: "sine" | "square" | "sawtooth" = "sine"): Float32Array {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const fade = Math.min(1, (numSamples - i) / (sampleRate * 0.05)); // 50ms fade out

    let sample = 0;
    if (type === "sine") {
      sample = Math.sin(2 * Math.PI * freq * t);
    } else if (type === "square") {
      sample = Math.sin(2 * Math.PI * freq * t) > 0 ? 1 : -1;
    }

    samples[i] = sample * 0.5 * fade;
  }

  return samples;
}

export const generateCoin = () => {
  const s1 = tone(880, 0.05);
  const s2 = tone(1320, 0.1);
  const combined = new Float32Array(s1.length + s2.length);
  combined.set(s1);
  combined.set(s2, s1.length);
  return createWavDataUri(combined);
};

export const generateCorrect = () => {
  const s1 = tone(660, 0.1);
  const s2 = tone(880, 0.2);
  const combined = new Float32Array(s1.length + s2.length);
  combined.set(s1);
  combined.set(s2, s1.length);
  return createWavDataUri(combined);
};

export const generateWrong = () => {
  const s1 = tone(220, 0.2, "square");
  const s2 = tone(110, 0.3, "square");
  const combined = new Float32Array(s1.length + s2.length);
  combined.set(s1);
  combined.set(s2, s1.length);
  return createWavDataUri(combined);
};

export const generatePowerUp = () => {
  const duration = 0.5;
  const sampleRate = 44100;
  const numSamples = sampleRate * duration;
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = 440 + 880 * (i / numSamples);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * 0.3 * (1 - i / numSamples);
  }
  return createWavDataUri(samples);
};

export const generateGhost = () => {
  const duration = 0.3;
  const sampleRate = 44100;
  const numSamples = sampleRate * duration;
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    samples[i] = (Math.random() * 2 - 1) * 0.2 * (1 - i / numSamples);
  }
  return createWavDataUri(samples);
};

export const generateBeep = () => createWavDataUri(tone(440, 0.1));
export const generateVictory = () => {
  const s1 = tone(523.25, 0.1); // C5
  const s2 = tone(659.25, 0.1); // E5
  const s3 = tone(783.99, 0.1); // G5
  const s4 = tone(1046.5, 0.3); // C6
  const combined = new Float32Array(s1.length + s2.length + s3.length + s4.length);
  combined.set(s1);
  combined.set(s2, s1.length);
  combined.set(s3, s1.length + s2.length);
  combined.set(s4, s1.length + s2.length + s3.length);
  return createWavDataUri(combined);
};
