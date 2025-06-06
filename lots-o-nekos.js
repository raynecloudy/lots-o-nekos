// original oneko.js: https://github.com/adryd325/oneko.js/
// modified edition: https://github.com/raynecloudy/lots-o-nekos/


// if not using as a module, please remove the export line at the bottom! the script will error and not run if you don't!


/**
 * @typedef {"ace" | "black" | "bunny" | "calico" | "default" | "eevee" | "esmeralda" | "fox" | "ghost" | "gray" | "jess" | "kina" | "lucy" | "maia" | "maria" | "mike" | "silver" | "silversky" | "snuupy" | "spirit" | "tora" | "valentine"} OnekoDatabaseSource
 * @typedef {"sleeping" | "scratchSelf" | "scratchWallW" | "scratchWallN" | "scratchWallE" | "scratchWallS" | null} OnekoIdleAnimation
 * @typedef {{element?: HTMLDivElement | null, x?: number, y?: number, speed?: number, source?: string, updateSpeed?: number, loopAnimating?: boolean, skipAlertAnimation?: boolean, targetX?: number, targetY?: number, frameCount?: number, idleTime?: number, idleAnimation?: OnekoIdleAnimation, idleAnimationFrame?: number, skipElementInit?: boolean}} OnekoOptions
 * @typedef {keyof typeof Oneko.prototype.spriteSets} OnekoSpriteSetOption
 */

/**
 * An Oneko.
 */
class Oneko extends EventTarget {
  /**
   * Will be removed in 2.5.0. Use `lastFrameTimestamp` instead.
   * @readonly
   * @deprecated
   */
  _lastFrameTimestamp;

  /**
   * Controls if onAnimationFrame() loops after each completion of itself.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#loopanimating-boolean)
   * @type {boolean}
   * @since 2.2.0
   */
  loopAnimating;

  /**
   * Controls if the alert animation is skipped before running begins.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#skipalertanimation-boolean)
   * @type {boolean}
   * @since 2.2.0
   */
  skipAlertAnimation;

  /**
   * The Oneko's `element`'s position on the X axis, in pixels.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#x-number)
   * @type {number}
   * @since 1.0.0
   */
  x;

  /**
   * The Oneko's `element`'s position on the Y axis, in pixels.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#y-number)
   * @type {number}
   * @since 1.0.0
   */
  y;

  /**
   * How far the Oneko runs per update, in pixels.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#speed-number)
   * @type {number}
   * @since 1.0.0
   */
  speed;

  /**
   * The path to an image file used to represent the Oneko.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#source-string)
   * @type {string}
   * @since 1.0.0
   */
  source;

  /**
   * How fast the Oneko updates its animations, in milliseconds.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#updatespeed-number)
   * @type {number}
   * @since 1.0.0
   */
  updateSpeed;

  /**
   * An HTMLDivElement used to represent the Oneko in the document.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#element-htmldivelement--null)
   * @type {HTMLDivElement | null}
   * @since 1.0.0
   */
  element;

  /**
   * The X position the Oneko is running towards, in pixels.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#targetx-number)
   * @type {number}
   * @since 1.0.0
   */
  targetX;

  /**
   * The Y position the Oneko is running towards, in pixels.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#targety-number)
   * @type {number}
   * @since 1.0.0
   */
  targetY;

  /**
   * How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#framecount-number)
   * @type {number}
   * @since 1.0.0
   */
  frameCount;

  /**
   * How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idletime-number)
   * @type {number}
   * @since 1.0.0
   */
  idleTime;

  /**
   * The idle animation that's currently playing. `null` means the regular idle animation of being played.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idleanimation-onekoidleanimation)
   * @type {OnekoIdleAnimation}
   * @since 1.0.0
   */
  idleAnimation;

  /**
   * The current frame of the playing idle animation.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idleanimationframe-number)
   * @type {number}
   * @since 1.0.0
   */
  idleAnimationFrame;

  /**
   * Only `true` if the Oneko has been properly initialized. For example, if the `prefers-reduced-motion` media query is set to `reduce`, the Oneko will not initialize and `initialized` will be `false`.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#initialized-boolean)
   * @readonly
   * @type {boolean}
   * @since 2.3.0
   */
  initialized = false;

  /**
   * The timestamp of the last time the Oneko's `element` was updated.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#lastframetimestamp-number)
   * @readonly
   * @type {number}
   * @since 1.0.0
   */
  lastFrameTimestamp;

  /**
   * A keyed list of Events fired by the Oneko object.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#events)
   * @readonly
   * @since 1.1.0
   */
  events = {
    /**
     * Fired after the draw() method is finished.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#draw)
     * @since 1.1.0
     */
    "draw": new Event("draw"),
    /**
     * Fired after target coordinate becomes outside range, after alert animation plays.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#startrunning)
     * @since 2.0.0
     */
    "startRunning": new Event("startRunning"),
    /**
     * Fired after target coordinate becomes inside range.
     * 
     * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#stoprunning)
     * @since 2.0.0
     */
    "stopRunning": new Event("stopRunning")
  };

  /**
   * A keyed list of arrays of points ([number, number]), defined as animations.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#spritesets)
   * 
   * ![image](https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png)
   * @since 1.0.0
   */
  spriteSets = {
    /**
     * The Oneko is standing still.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/idle.png)
     * @since 1.0.0
     */
    idle: [[-3, -3]],
    /**
     * Shown before the Oneko starts running to the target coordinate.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/alert.png)
     * @since 1.0.0
     */
    alert: [[-7, -3]],
    /**
     * Alternative idle animation - the Oneko scratches its ears.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchSelf.png)
     * @since 1.0.0
     */
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the top of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the top of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallN.png)
     * @since 1.0.0
     */
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the bottom of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the bottom of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallS.png)
     * @since 1.0.0
     */
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the right side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the right side of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallE.png)
     * @since 1.0.0
     */
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the left side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the left side of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallW.png)
     * @since 1.0.0
     */
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    /**
     * Alternative idle animation - the Oneko is getting ready to sleep.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/tired.png)
     * @since 1.0.0
     */
    tired: [[-3, -2]],
    /**
     * Alternative idle animation - the Oneko is sleeping.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/sleeping.png)
     * @since 1.0.0
     */
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    /**
     * The Oneko is running up.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/N.png)
     * @since 1.0.0
     */
    N: [
      [-1, -2],
      [-1, -3],
    ],
    /**
     * The Oneko is running up and to the right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NE.png)
     * @since 1.0.0
     */
    NE: [
      [0, -2],
      [0, -3],
    ],
    /**
     * The Oneko is running right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/E.png)
     * @since 1.0.0
     */
    E: [
      [-3, 0],
      [-3, -1],
    ],
    /**
     * The Oneko is running down and to the right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SE.png)
     * @since 1.0.0
     */
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    /**
     * The Oneko is running down.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/S.png)
     * @since 1.0.0
     */
    S: [
      [-6, -3],
      [-7, -2],
    ],
    /**
     * The Oneko is running down and to the left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SW.png)
     * @since 1.0.0
     */
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    /**
     * The Oneko is running left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/W.png)
     * @since 1.0.0
     */
    W: [
      [-4, -2],
      [-4, -3],
    ],
    /**
     * The Oneko is running up and to the left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NW.png)
     * @since 1.0.0
     */
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  /**
   * @param {OnekoOptions} [options] Options for the Oneko.
   */
  constructor(options) {
    super();

    const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReducedMotion) {
      console.warn("The prefers-reduced-motion media query is set to reduce. The Oneko will not be initialized.");
      return;
    };

    options = options ?? {};
    
    this.x = options.x ?? 16;
    this.y = options.y ?? 16;
    this.speed = options.speed ?? 10;
    this.source = options.source ?? "https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png";
    this.updateSpeed = options.updateSpeed ?? 100;
    this.loopAnimating = options.loopAnimating ?? true;
    this.skipAlertAnimation = options.skipAlertAnimation ?? false;
    
    this.element = options.element === undefined ? document.createElement("div") : options.element;

    if (options.skipElementInit !== true) {
      this.element.className = "oneko";
      this.element.ariaHidden = true;
      this.element.style.width = "32px";
      this.element.style.height = "32px";
      this.element.style.position = "fixed";
      this.element.style.pointerEvents = "none";
      this.element.style.imageRendering = "pixelated";
      this.element.style.zIndex = 2147483647;
  
      this.element = document.body.appendChild(this.element);
    }
    
    this.targetX = options.targetX ?? this.x;
    this.targetY = options.targetY ?? this.y;
    this.frameCount = options.frameCount ?? 0;
    this.idleTime = options.idleTime ?? 0;
    this.idleAnimation = options.idleAnimation ?? null;
    this.idleAnimationFrame = options.idleAnimationFrame ?? 0;
    this.lastFrameTimestamp = 0;
    this._lastFrameTimestamp = options.lastFrameTimestamp;
    
    this.draw();

    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    window.requestAnimationFrame(this.onAnimationFrame);

    this.initialized = true;
  }

  /**
   * Sets the coordinates for the Oneko to run to.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#settargetx-number-y-number-oneko)
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   * @since 1.0.0
   */
  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
    
    return this;
  }

  /**
   * Sets the coordinates for the Oneko element to be positioned at.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setpositionx-number-y-number-oneko)
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   * @since 2.3.0
   */
  setPosition(x, y) {
    this.x = x;
    this.x = y;
    
    return this;
  }

  /**
   * Sets the Oneko's target coordinates and element position.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#movetox-number-y-number-oneko)
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   * @since 2.3.0
   */
  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.x = x;
    this.x = y;
    
    return this;
  }

  /**
   * Sets the source image of the Oneko element to a URL accessing the source database of Oneko PNGs (https://github.com/raynecloudy/oneko_db/). Recently added images may not appear in the selector.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setsourcedbsourcename-onekodatabasesource-oneko)
   * @param {OnekoDatabaseSource | (string & {})} sourceName The name of the image to access from the source database
   * @since 2.1.0
   */
  setSourceDB(sourceName) {
    this.source = `https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/${encodeURIComponent(sourceName)}.png`;
    
    return this;
  }

  /**
   * Runs every frame. Enables Oneko animations.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#onanimationframetimestamp-number-oneko)
   * @param {number} timestamp Duration since last update.
   * @since 2.3.0
   */
  onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!this.element.isConnected) {
      return this;
    }
    if (!this.lastFrameTimestamp) {
      this.lastFrameTimestamp = timestamp;
      this._lastFrameTimestamp = timestamp;
    }
    if (timestamp - this.lastFrameTimestamp > this.updateSpeed) {
      this.lastFrameTimestamp = timestamp;
      this._lastFrameTimestamp = timestamp;
      this.frame();
    }
    if (this.loopAnimating === true) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    
    return this;
  }

  /**
   * Sets the sprite image to a given frame of a given animation.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#setspritename-string-frame-number-oneko)
   * @param {OnekoSpriteSetOption} setName Name of animation to access.
   * @param {number} frame Frame of animation to access.
   * @since 2.3.0
   */
  setSprite(setName, frame) {
    const sprite = this.spriteSets[setName][frame % this.spriteSets[setName].length];
    this.element.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    this.draw();

    return this;
  }

  /**
   * Resets the idle animation.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#resetidleanimation-oneko)
   * @since 2.3.0
   */
  resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    
    return this;
  }

  /**
   * Controls idle animation logic (scratching, sleeping, etc.)
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#idle-oneko)
   * @since 2.3.0
   */
  idle() {
    if (this.idleTime === 1) {
      this.dispatchEvent(this.events.stopRunning);
    }

    this.idleTime += 1;

    // every ~ 20 seconds
    if (
      this.idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      this.idleAnimation == null
    ) {
      let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
      if (this.x < 32) {
        avalibleIdleAnimations.push("scratchWallW");
      }
      if (this.y < 32) {
        avalibleIdleAnimations.push("scratchWallN");
      }
      if (this.x > window.innerWidth - 32) {
        avalibleIdleAnimations.push("scratchWallE");
      }
      if (this.y > window.innerHeight - 32) {
        avalibleIdleAnimations.push("scratchWallS");
      }
      this.idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (this.idleAnimation) {
      case "sleeping":
        if (this.idleAnimationFrame < 8) {
          this.setSprite("tired", 0);
          break;
        }
        this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 4));
        if (this.idleAnimationFrame > 192) {
          this.resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        this.setSprite(this.idleAnimation, this.idleAnimationFrame);
        if (this.idleAnimationFrame > 9) {
          this.resetIdleAnimation();
        }
        break;
      default:
        this.setSprite("idle", 0);
        return this;
    }
    this.idleAnimationFrame += 1;
    
    return this;
  }

  /**
   * Controls all animation logic.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#frame-oneko)
   * @since 2.3.0
   */
  frame() {
    this.frameCount += 1;
    const diffX = this.x - this.targetX;
    const diffY = this.y - this.targetY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < this.speed || distance < 48) {
      this.idle();
      return this;
    }

    this.idleAnimation = null;
    this.idleAnimationFrame = 0;

    if (this.skipAlertAnimation === false) {
      if (this.idleTime > 1) {
        this.setSprite("alert", 0);
        // count down after being alerted before moving
        this.idleTime = Math.min(this.idleTime, 7);
        this.idleTime -= 1;
        if (this.idleTime === 1) {
          this.dispatchEvent(this.events.startRunning);
        }
        return this;
      }
    } else {
      if (this.idleTime > 1) {
        this.idleTime = 1;
        this.dispatchEvent(this.events.startRunning);
      }
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    this.setSprite(direction, this.frameCount);

    this.x -= (diffX / distance) * this.speed;
    this.y -= (diffY / distance) * this.speed;

    this.x = Math.min(Math.max(16, this.x), window.innerWidth - 16);
    this.y = Math.min(Math.max(16, this.y), window.innerHeight - 16);

    this.draw();
    
    return this;
  }

  /**
   * Updates the Oneko element's position and image. Fires the `draw` event after completion.
   * 
   * [Documentation Reference](https://github.com/raynecloudy/lots-o-nekos/blob/master/DOCUMENTATION.md#draw-oneko)
   * @since 2.3.0
   */
  draw() {
    this.element.style.left = `${this.x - 16}px`;
    this.element.style.top = `${this.y - 16}px`;
    this.element.style.backgroundImage = `url(${this.source})`;

    this.dispatchEvent(this.events.draw);
    
    return this;
  }

  /**
   * Will be removed in 2.5.0. Use `events` instead.
   * @readonly
   * @deprecated
   */
  _events = this.events
  /**
   * Will be removed in 2.5.0. Use `draw()` instead.
   * @deprecated
   */
  _draw() {
    return this.draw();
  }
  /**
   * Will be removed in 2.5.0. Use `frame()` instead.
   * @deprecated
   */
  _frame() {
    return this.frame();
  }
  /**
   * Will be removed in 2.5.0. Use `onAnimationFrame()` instead.
   * @deprecated
   * @param {number} timestamp Duration since last update
   */
  _onAnimationFrame(timestamp) {
    return this.onAnimationFrame(timestamp);
  }
  /**
   * Will be removed in 2.5.0. Use `resetIdleAnimation()` instead.
   * @deprecated
   */
  _resetIdleAnimation() {
    return this.resetIdleAnimation();
  }
  /**
   * Will be removed in 2.5.0. Use `idle()` instead.
   * @deprecated
   */
  _idle() {
    return this.idle();
  }
}

export default Oneko;
