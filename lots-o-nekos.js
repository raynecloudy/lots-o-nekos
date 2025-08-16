// original oneko.js: https://github.com/adryd325/oneko.js/
// modified edition: https://github.com/raynecloudy/lots-o-nekos/


// if not using as a module, please remove the export line at the bottom! the script will error and not run if you don't!


/**
 * An Oneko.
 */
class Oneko extends EventTarget {
  loopAnimating;
  skipAlertAnimation;
  x;
  y;
  speed;
  source;
  updateSpeed;
  element;
  targetX;
  targetY;
  frameCount;
  idleTime;
  idleAnimation;
  idleAnimationFrame;
  initialized = false;
  lastFrameTimestamp;

  events = {
    "draw": new Event("draw"),
    "startRunning": new Event("startRunning"),
    "stopRunning": new Event("stopRunning")
  };

  spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

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

  moveTo(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.x = x;
    this.x = y;
    
    return this;
  }

  setSourceDB(sourceName) {
    this.source = `https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/${encodeURIComponent(sourceName)}.png`;
    
    return this;
  }

  onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!this.element.isConnected) {
      return this;
    }
    if (!this.lastFrameTimestamp) {
      this.lastFrameTimestamp = timestamp;
    }
    if (timestamp - this.lastFrameTimestamp > this.updateSpeed) {
      this.lastFrameTimestamp = timestamp;
      this.frame();
    }
    if (this.loopAnimating === true) {
      window.requestAnimationFrame(this.onAnimationFrame);
    }
    
    return this;
  }

  setSprite(setName, frame) {
    const sprite = this.spriteSets[setName][frame % this.spriteSets[setName].length];
    this.element.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    this.draw();

    return this;
  }

  resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    
    return this;
  }

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

  draw() {
    this.element.style.left = `${this.x - 16}px`;
    this.element.style.top = `${this.y - 16}px`;
    this.element.style.backgroundImage = `url(${this.source})`;

    this.dispatchEvent(this.events.draw);
    
    return this;
  }

  isInitialized() {
    return this.initialized;
  }
}

export { Oneko };
