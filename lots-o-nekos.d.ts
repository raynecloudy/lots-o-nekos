declare module "lots-o-nekos" {
  type OnekoDatabaseSource = "ace" | "black" | "bunny" | "calico" | "default" | "eevee" | "esmeralda" | "fox" | "ghost" | "gray" | "jess" | "kina" | "lucy" | "maia" | "maria" | "mike" | "silver" | "silversky" | "snuupy" | "spirit" | "tora" | "valentine";
  type OnekoIdleAnimation = "sleeping" | "scratchSelf" | "scratchWallW" | "scratchWallN" | "scratchWallE" | "scratchWallS";
  type OnekoSpriteSetOption = keyof typeof Oneko.prototype.spriteSets;
  type OnekoOptions = {
    element?: HTMLDivElement | null,
    x?: number,
    y?: number,
    speed?: number,
    source?: string,
    updateSpeed?: number,
    loopAnimating?: boolean,
    skipAlertAnimation?: boolean,
    targetX?: number,
    targetY?: number,
    frameCount?: number,
    idleTime?: number,
    idleAnimation?: OnekoIdleAnimation | null,
    idleAnimationFrame?: number,
    skipElementInit?: boolean
  };

  export default class Oneko extends EventTarget {
    loopAnimating: boolean;
    skipAlertAnimation: boolean;
    x: number;
    y: number;
    speed: number;
    source: string;
    updateSpeed: number;
    element: HTMLDivElement | null;
    targetX: number;
    targetY: number;
    frameCount: number;
    idleTime: number;
    idleAnimationFrame: number;
    idleAnimation: OnekoIdleAnimation | null;
    readonly initialized: boolean;
    readonly lastFrameTimestamp: number | null;
    readonly _events: {
      draw: Event,
      startRunning: Event,
      stopRunning: Event
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
      NW: number[][]
    };
    constructor(options?: OnekoOptions);
    setTarget(x: number, y: number): Oneko;
    setPosition(x: number, y: number): Oneko;
    moveTo(x: number, y: number): Oneko;
    setSourceDB(sourceName: OnekoDatabaseSource | string): Oneko;
    onAnimationFrame(timestamp: number): Oneko;
    setSprite(setName: OnekoSpriteSetOption, frame: number): Oneko;
    resetIdleAnimation(): Oneko;
    idle(): Oneko;
    frame(): Oneko;
    draw(): Oneko;
  }
}
