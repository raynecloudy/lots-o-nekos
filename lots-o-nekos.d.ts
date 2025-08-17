declare module "lots-o-nekos" {
  type OnekoDatabaseSource = "ace" | "black" | "bunny" | "calico" | "default" | "eevee" | "esmeralda" | "fox" | "ghost" | "gray" | "jess" | "kina" | "lucy" | "maia" | "maria" | "mike" | "silver" | "silversky" | "snuupy" | "spirit" | "tora" | "valentine";
  type OnekoIdleAnimation = "sleeping" | "scratchSelf" | "scratchWallW" | "scratchWallN" | "scratchWallE" | "scratchWallS";
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
  type OnekoSpriteSetOption = keyof typeof Oneko.prototype.spriteSets;

  export class Oneko extends EventTarget {
    /**
     * Controls if onAnimationFrame() loops after each completion of itself.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#loopanimating-boolean)
     * @since 2.2.0
     */
    loopAnimating: boolean | undefined;
    /**
     * Controls if the alert animation is skipped before running begins.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#skipalertanimation-boolean)
     * @since 2.2.0
     */
    skipAlertAnimation: boolean | undefined;
    /**
     * The Oneko's `element`'s position on the X axis, in pixels.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#x-number)
     * @since 1.0.0
     */
    x: number | undefined;
    /**
     * The Oneko's `element`'s position on the Y axis, in pixels.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#x-number)
     * @since 1.0.0
     */
    y: number | undefined;
    /**
     * How far the Oneko runs per update, in pixels.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#speed-number)
     * @since 1.0.0
     */
    speed: number | undefined;
    /**
     * The path to an image file used to represent the Oneko.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#source-string)
     * @since 1.0.0
     */
    source: string | undefined;
    /**
     * How fast the Oneko updates its animations, in milliseconds.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#updatespeed-number)
     * @since 1.0.0
     */
    updateSpeed: number | undefined;
    /**
     * An HTMLDivElement used to represent the Oneko in the document.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#element-htmldivelement--null)
     * @since 1.0.0
     */
    element: HTMLDivElement | null | undefined;
    /**
     * The X position the Oneko is running towards, in pixels.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#targetx-number)
     * @since 1.0.0
     */
    targetX: number | undefined;
    /**
     * The Y position the Oneko is running towards, in pixels.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#targety-number)
     * @since 1.0.0
     */
    targetY: number | undefined;
    /**
     * How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#framecount-number)
     * @since 1.0.0
     */
    frameCount: number | undefined;
    /**
     * How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idletime-number)
     * @since 1.0.0
     */
    idleTime: number | undefined;
    /**
     * The idle animation that's currently playing. `null` means the regular idle animation of being played.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idleanimation-onekoidleanimation)
     * @since 1.0.0
     */
    idleAnimation: OnekoIdleAnimation | null | undefined;
    /**
     * The current frame of the playing idle animation.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idleanimationframe-number)
     * @since 1.0.0
     */
    idleAnimationFrame: number | undefined;
    /**
     * **This attribute is now private. Use `isInitialized()` instead.**
     * 
     * Only `true` if the Oneko has been properly initialized. For example, if the `prefers-reduced-motion` media query is set to `reduce`, the Oneko will not initialize and `initialized` will be `false`.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#initialized-boolean)
     * @since 2.3.0
     */
    protected readonly initialized: boolean;
    /**
     * The timestamp of the last time the Oneko's `element` was updated.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#lastframetimestamp-number)
     * @since 1.0.0
     */
    readonly lastFrameTimestamp: number | null | undefined;
    /**
     * A keyed list of Events fired by the Oneko object.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#events)
     * @since 1.1.0
     */
    private readonly events: {
      /**
       * Fired after the draw() method is finished.
       * 
       * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#draw)
       * @since 1.1.0
       */
      draw: Event,
      /**
       * Fired after target coordinate becomes outside range, after alert animation plays.
       * 
       * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#startrunning)
       * @since 2.0.0
       */
      startRunning: Event,
      /**
       * Fired after target coordinate becomes inside range.
       * 
       * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#stoprunning)
       * @since 2.0.0
       */
      stopRunning: Event
    };
    /**
     * A keyed list of arrays of points ([number, number]), defined as animations.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#spritesets)
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png)
     * @since 1.0.0
     */
    spriteSets: {
      /**
       * The Oneko is standing still.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/idle.png)
       * @since 1.0.0
       */
      idle: number[][],
      /**
       * Shown before the Oneko starts running to the target coordinate.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/alert.png)
       * @since 1.0.0
       */
      alert: number[][],
      /**
       * Alternative idle animation - the Oneko scratches its ears.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchSelf.png)
       * @since 1.0.0
       */
      scratchSelf: number[][],
      /**
       * Alternative idle animation - the Oneko scratches the top of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the top of the viewport.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallN.png)
       * @since 1.0.0
       */
      scratchWallN: number[][],
      /**
       * Alternative idle animation - the Oneko scratches the bottom of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the bottom of the viewport.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallS.png)
       * @since 1.0.0
       */
      scratchWallS: number[][],
      /**
       * Alternative idle animation - the Oneko scratches the right side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the right side of the viewport.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallE.png)
       * @since 1.0.0
       */
      scratchWallE: number[][],
      /**
       * Alternative idle animation - the Oneko scratches the left side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the left side of the viewport.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallW.png)
       * @since 1.0.0
       */
      scratchWallW: number[][],
      /**
       * Alternative idle animation - the Oneko is getting ready to sleep.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/tired.png)
       * @since 1.0.0
       */
      tired: number[][],
      /**
       * Alternative idle animation - the Oneko is sleeping.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/sleeping.png)
       * @since 1.0.0
       */
      sleeping: number[][],
      /**
       * The Oneko is running up.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/N.png)
       * @since 1.0.0
       */
      N: number[][],
      /**
       * The Oneko is running up and to the right.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NE.png)
       * @since 1.0.0
       */
      NE: number[][],
      /**
       * The Oneko is running right.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/E.png)
       * @since 1.0.0
       */
      E: number[][],
      /**
       * The Oneko is running down and to the right.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SE.png)
       * @since 1.0.0
       */
      SE: number[][],
      /**
       * The Oneko is running down.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/S.png)
       * @since 1.0.0
       */
      S: number[][],
      /**
       * The Oneko is running down and to the left.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SW.png)
       * @since 1.0.0
       */
      SW: number[][],
      /**
       * The Oneko is running left.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/W.png)
       * @since 1.0.0
       */
      W: number[][],
      /**
       * The Oneko is running up and to the left.
       * 
       * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NW.png)
       * @since 1.0.0
       */
      NW: number[][]
    };
    constructor(
      /**
       * Options for the Oneko.
       */
      options?: OnekoOptions
    );
    /**
     * Sets the coordinates for the Oneko to run to.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#settargetx-number-y-number-oneko)
     * @since 1.0.0
     */
    setTarget(
      /**
       * X location, in pixels.
       */
      x: number,
      /**
       * Y location, in pixels.
       */
      y: number
    ): typeof this;
    /**
     * Sets the coordinates for the Oneko element to be positioned at.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setpositionx-number-y-number-oneko)
     * @since 2.3.0
     */
    setPosition(
      /**
       * X location, in pixels.
       */
      x: number,
      /**
       * Y location, in pixels.
       */
      y: number
    ): typeof this;
    /**
     * Sets the Oneko's target coordinates and element position.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#movetox-number-y-number-oneko)
     * @since 2.3.0
     */
    moveTo(
      /**
       * X location, in pixels.
       */
      x: number,
      /**
       * Y location, in pixels.
       */
      y: number
    ): typeof this;
    /**
     * Sets the source image of the Oneko element to a URL accessing the source database of Oneko PNGs (https://github.com/raynecloudy/oneko_db/). Recently added images may not appear in the selector.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setsourcedbsourcename-onekodatabasesource-oneko)
     * @since 2.1.0
     */
    setSourceDB(
      /**
       * The name of the image to access from the source database.
       */
      sourceName: OnekoDatabaseSource | "random" | (string & {})
    ): typeof this;
    /**
     * Constructs a complete URL path to a file of a given name on the online source database.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#createdatabasesourceurlsourcename-onekodatabasesource-string)
     * @since 3.0.0
     */
    static createDatabaseSourceURL(
      /**
       * The name of the image to access from the source database.
       */
      sourceName: OnekoDatabaseSource | "random" | (string & {})
    ): `https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/${typeof sourceName}.png`;
    /**
     * Runs every frame. Enables Oneko animations.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#onanimationframetimestamp-number-oneko)
     * @since 2.3.0
     */
    onAnimationFrame(
      /**
       * Duration since last update.
       */
      timestamp: number
    ): typeof this;
    /**
     * Sets the sprite image to a given frame of a given animation.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setspritename-string-frame-number-oneko)
     * @since 2.3.0
     */
    setSprite(
      /**
       * Name of animation to access.
       */
      setName: OnekoSpriteSetOption,
      /**
       * Frame of animation to access.
       */
      frame: number
    ): typeof this;
    /**
     * Resets the idle animation.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#resetidleanimation-oneko)
     * @since 2.3.0
     */
    resetIdleAnimation(): typeof this;
    /**
     * Controls idle animation logic (scratching, sleeping, etc.)
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idle-oneko)
     * @since 2.3.0
     */
    idle(): typeof this;
    /**
     * Controls all animation logic.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#frame-oneko)
     * @since 2.3.0
     */
    frame(): typeof this;
    /**
     * Updates the Oneko element's position and image. Fires the `draw` event after completion.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#draw-oneko)
     * @since 2.3.0
     */
    draw(): typeof this;
    /**
     * Only `true` if the Oneko has been properly initialized. For example, if the `prefers-reduced-motion` media query is set to `reduce`, the Oneko will not initialize and `initialized` will be `false`.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#isinitialized-boolean)
     * @since 3.0.0
     */
    isInitialized(): this is InitializedOneko;
    /**
     * Returns `true` if an Oneko can be initialized under current conditions. An example in which this would return `false` is if the `prefers-reduced-motion` media query is set to `reduce`.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#caninitialize-boolean)
     * @since 3.0.0
     */
    static canInitialize(): boolean;
    /**
     * Forces an initialized Oneko object.
     * 
     * @since 3.0.0
     * @throws {Error} If Oneko class cannot be initialized.
     */
    force(): InitializedOneko;
  }

  class InitializedOneko extends Oneko {
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
    idleAnimation: OnekoIdleAnimation | null;
    idleAnimationFrame: number;
    protected readonly initialized: true;
    readonly lastFrameTimestamp: number;

    private constructor();
  }
}
