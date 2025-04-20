declare module "lots-o-nekos" {
  export class Oneko {
    x: number;
    y: number;
    speed: number;
    source: number;
    updateSpeed: number;
    element: HTMLDivElement | null;
    targetX: number;
    targetY: number;
    frameCount: number;
    idleTime: number;
    idleAnimation: number;
    idleAnimationFrame: number;
    _lastFrameTimestamp: number | null;
    _events: {
      "draw": Event,
      "startRunning": Event,
      "stopRunning": Event,
    };
    spriteSets: {
      idle: number[][],
      alert: number[][],
      scratchSelf: number[][],
      scratchWallN: number[][],
      scratchWallS: number[][],
      scratchWallE: number[][],
      scratchWallW: number[][],
      tired: number[][],
      sleeping: number[][],
      N: number[][],
      NE: number[][],
      E: number[][],
      SE: number[][],
      S: number[][],
      SW: number[][],
      W: number[][],
      NW: number[][],
    };
  }
  export type OnekoSource = "ace"|"black"|"bunny"|"calico"|"default"|"eevee"|"esmeralda"|"fox"|"ghost"|"gray"|"jess"|"kina"|"lucy"|"maia"|"maria"|"mike"|"silver"|"silversky"|"snuupy"|"spirit"|"tora"|"valentine";
}
