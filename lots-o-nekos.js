// original oneko.js: https://github.com/adryd325/oneko.js/
// modified edition: https://github.com/raynecloudy/lots-o-nekos/


// if not using as a module, please remove the export line at the bottom! the script will error and not run if you don't!


/**
 * @typedef {"sleeping" | "scratchSelf" | "scratchWallW" | "scratchWallN" | "scratchWallE" | "scratchWallS" | null} OnekoIdleAnimation
 * @typedef {"ace" | "black" | "bunny" | "calico" | "default" | "eevee" | "esmeralda" | "fox" | "ghost" | "gray" | "jess" | "kina" | "lucy" | "maia" | "maria" | "mike" | "silver" | "silversky" | "snuupy" | "spirit" | "tora" | "valentine"} OnekoDatabaseSource
 */

/**
 * An Oneko.
 */
class Oneko extends EventTarget {
  /**
   * Controls if onAnimationFrame() loops after each completion of itself.
   * @type {boolean}
   */
  recursiveAnimating;

  /**
   * Controls if the alert animation is skipped before running begins.
   * @type {boolean}
   */
  skipAlertAnimation;

  /**
   * The Oneko's `element`'s position on the X axis, in pixels.
   * @type {number}
   */
  x;

  /**
   * The Oneko's `element`'s position on the Y axis, in pixels.
   * @type {number}
   */
  y;

  /**
   * How far the Oneko runs per update, in pixels.
   * @type {number}
   */
  speed;

  /**
   * The path to an image file used to represent the Oneko.
   * @type {string}
   */
  source;

  /**
   * How fast the Oneko updates its animations, in milliseconds.
   * @type {number}
   */
  updateSpeed;

  /**
   * An HTMLDivElement used to represent the Oneko in the document.
   * @type {HTMLDivElement | null}
   */
  element;

  /**
   * The X position the Oneko is running towards, in pixels.
   * @type {number}
   */
  targetX;

  /**
   * The Y position the Oneko is running towards, in pixels.
   * @type {number}
   */
  targetY;

  /**
   * How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.
   * @type {number}
   */
  frameCount;

  /**
   * How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.
   * @type {number}
   */
  idleTime;

  /**
   * The idle animation that's currently playing. `null` means the regular idle animation of being played.
   * @type {OnekoIdleAnimation}
   */
  idleAnimation;

  /**
   * The current frame of the playing idle animation.
   * @type {number}
   */
  idleAnimationFrame;

  /**
   * The timestamp of the last time the Oneko's `element` was updated.
   * @type {number}
   */
  lastFrameTimestamp;

  /**
   * A keyed list of Events fired by the Oneko object.
   */
  events = {
    /**
     * Fired after the draw() method is finished.
     */
    "draw": new Event("draw"),
    /**
     * Fired after target coordinate becomes outside range, after alert animation plays
     */
    "startRunning": new Event("startRunning"),
    /**
     * Fired after target coordinate becomes inside range.
     */
    "stopRunning": new Event("stopRunning")
  };

  /**
   * A keyed list of arrays of points ([number, number]), defined as animations.
   * 
   * ![image](https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png)
   */
  spriteSets = {
    /**
     * The Oneko is standing still.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/idle.png)
     */
    idle: [[-3, -3]],
    /**
     * Shown before the Oneko starts running to the target coordinate.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/alert.png)
     */
    alert: [[-7, -3]],
    /**
     * Alternative idle animation - the Oneko scratches its ears.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchSelf.png)
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
     */
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the bottom of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the bottom of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallS.png)
     */
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the right side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the right side of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallE.png)
     */
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    /**
     * Alternative idle animation - the Oneko scratches the left side of the viewport. Can only be seen when the Oneko's `element` is less than 32 pixels away from the left side of the viewport.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/scratchWallW.png)
     */
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    /**
     * Alternative idle animation - the Oneko is getting ready to sleep.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/tired.png)
     */
    tired: [[-3, -2]],
    /**
     * Alternative idle animation - the Oneko is sleeping.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/sleeping.png)
     */
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    /**
     * The Oneko is running up.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/N.png)
     */
    N: [
      [-1, -2],
      [-1, -3],
    ],
    /**
     * The Oneko is running up and to the right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NE.png)
     */
    NE: [
      [0, -2],
      [0, -3],
    ],
    /**
     * The Oneko is running right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/E.png)
     */
    E: [
      [-3, 0],
      [-3, -1],
    ],
    /**
     * The Oneko is running down and to the right.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SE.png)
     */
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    /**
     * The Oneko is running down.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/S.png)
     */
    S: [
      [-6, -3],
      [-7, -2],
    ],
    /**
     * The Oneko is running down and to the left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/SW.png)
     */
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    /**
     * The Oneko is running left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/W.png)
     */
    W: [
      [-4, -2],
      [-4, -3],
    ],
    /**
     * The Oneko is running up and to the left.
     * 
     * ![image](https://raw.githubusercontent.com/raynecloudy/lots-o-nekos/refs/heads/master/media/anim-locations/NW.png)
     */
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  constructor() {
    super();

    const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReducedMotion) {
      console.warn("The prefers-reduced-motion media query is set to reduce. The Oneko will not be initialized.");
      return;
    };
    
    this.x = 16;
    this.y = 16;
    this.speed = 10;
    this.source = "https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png";
    this.updateSpeed = 100;
    this.recursiveAnimating = true;
    this.skipAlertAnimation = false;
    
    this.element = document.createElement("div");

    this.element.className = "oneko";
    this.element.ariaHidden = true;
    this.element.style.width = "32px";
    this.element.style.height = "32px";
    this.element.style.position = "fixed";
    this.element.style.pointerEvents = "none";
    this.element.style.imageRendering = "pixelated";
    this.element.style.zIndex = 2147483647;

    this.element = document.body.appendChild(this.element);
    
    this.targetX = this.x;
    this.targetY = this.y;
    this.frameCount = 0;
    this.idleTime = 0;
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    this.lastFrameTimestamp;
    
    this.draw();

    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    window.requestAnimationFrame(this.onAnimationFrame);
  }

  /**
   * Sets the coordinates for the Oneko to run to.
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   */
  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  /**
   * Sets the coordinates for the Oneko element to be positioned at.
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   */
  setPosition(x, y) {
    this.x = x;
    this.x = y;
  }

  /**
   * Sets the Oneko's target coordinates and element position.
   * @param {number} x X location, in pixels.
   * @param {number} y Y location, in pixels.
   */
  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.x = x;
    this.x = y;
  }

  /**
   * Sets the source image of the Oneko element to a URL accessing the source database of Oneko PNGs (https://github.com/raynecloudy/oneko_db/).
   * 
   * Recently added images may not appear in the selector.
   * @param {OnekoDatabaseSource} sourceName The name of the image to access from the source database
   */
  setSourceDB(sourceName) {
    this.source = `https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/${encodeURIComponent(sourceName)}.png`;
  }

  /**
   * Runs every frame. Enables Oneko animations.
   * @param {number} timestamp Duration since last update.
   */
  onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!this.element.isConnected) {
      return;
    }
    if (!this.lastFrameTimestamp) {
      this.lastFrameTimestamp = timestamp;
    }
    if (timestamp - this.lastFrameTimestamp > this.updateSpeed) {
      this.lastFrameTimestamp = timestamp;
      this.frame();
    }
    if (this.recursiveAnimating === true) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
  }

  /**
   * Sets the sprite image to a given frame of a given animation.
   * @param {string} name Name of animation to access. The Y value on the sprite sheet.
   * @param {number} frame Frame of animation to access. The X value on the sprite sheet.
   */
  setSprite(name, frame) {
    const sprite = this.spriteSets[name][frame % this.spriteSets[name].length];
    this.element.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    this.draw();
  }

  /**
   * Resets the idle animation.
   */
  resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
  }

  /**
   * Controls idle animation logic (scratching, sleeping, etc.)
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
        return;
    }
    this.idleAnimationFrame += 1;
  }

  /**
   * Controls all animation logic.
   */
  frame() {
    this.frameCount += 1;
    const diffX = this.x - this.targetX;
    const diffY = this.y - this.targetY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < this.speed || distance < 48) {
      this.idle();
      return;
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
        return;
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
  }

  /**
   * Renders the Oneko using its `element`. Fires the `draw` event after completion.
   */
  draw() {
    this.element.style.left = `${this.x - 16}px`;
    this.element.style.top = `${this.y - 16}px`;
    this.element.style.backgroundImage = `url(${this.source})`;

    this.dispatchEvent(this.events.draw);
  }
}

export default Oneko;
