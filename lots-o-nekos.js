// Original oneko.js: https://github.com/adryd325/oneko.js/
// Modified edition: https://github.com/raynecloudy/lots-o-nekos/

class Oneko extends EventTarget {
  loopAnimating;
  skipAlertAnimation;
  x;
  y;
  speed;
  size;
  allowedTargetDistance;
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
  allowedIdleAnimations;
  yawnDuration;
  sleepDuration;
  scratchDuration;
  maxAlertDuration;

  events = {
    "draw": new Event("draw"),
    "startRunning": new Event("startRunning"),
    "stopRunning": new Event("stopRunning")
  };

  sourceOptions = [
    "ace",
    "black",
    "bunny",
    "calico",
    "default",
    "eevee",
    "esmeralda",
    "fox",
    "ghost",
    "gray",
    "jess",
    "kina",
    "lucy",
    "maia",
    "maria",
    "mike",
    "silver",
    "silversky",
    "snuupy",
    "spirit",
    "tora",
    "valentine"
  ];

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

    if (!Oneko.canInitialize()) {
      console.warn("The prefers-reduced-motion media query is set to reduce. The Oneko will not be initialized.");
      return;
    };

    options = options ?? {};

    this.x = options.x ?? 16;
    this.y = options.y ?? 16;
    this.speed = options.speed ?? 10;
    this.size = options.size ?? 32;
    this.allowedTargetDistance = options.allowedTargetDistance ?? 48;
    this.source = options.source ?? "https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png";
    this.updateSpeed = options.updateSpeed ?? 100;
    this.loopAnimating = options.loopAnimating ?? true;
    this.skipAlertAnimation = options.skipAlertAnimation ?? false;
    this.allowedIdleAnimations = options.allowedIdleAnimations ?? [
      "sleeping",
      "scratchSelf",
      "scratchWallN",
      "scratchWallE",
      "scratchWallS",
      "scratchWallW"
    ];
    this.yawnDuration = options.yawnDuration ?? 8;
    this.sleepDuration = options.sleepDuration ?? 192;
    this.scratchDuration = options.scratchDuration ?? 9;
    this.maxAlertDuration = options.maxAlertDuration ?? 7;

    this.element = options.element === undefined ? document.createElement("div") : options.element;

    if (options.skipElementInit !== true) {
      this.element.className = "oneko";
      this.element.ariaHidden = true;
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
    if (sourceName = "random") {
      sourceName = this.sourceOptions[Math.floor(Math.random() * this.sourceOptions.length)];
    }
    this.source = Oneko.resolveDatabaseURL(sourceName);

    return this;
  }

  static resolveDatabaseURL(sourceName) {
    if (sourceName = "random") {
      sourceName = this.sourceOptions[Math.floor(Math.random() * this.sourceOptions.length)];
    }
    this.source = Oneko.resolveDatabaseURL(sourceName);

    return `https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/${encodeURIComponent(sourceName)}.png`;
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
    this.element.style.backgroundPosition = `${sprite[0] * this.size}px ${sprite[1] * this.size}px`;
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
      let availableIdleAnimations = [];
      if (this.allowedIdleAnimations.includes("sleeping")) {
        availableIdleAnimations.push("sleeping");
      }
      if (this.allowedIdleAnimations.includes("scratchSelf")) {
        availableIdleAnimations.push("scratchSelf");
      }
      if (this.x < this.size && this.allowedIdleAnimations.includes("scratchWallW")) {
        availableIdleAnimations.push("scratchWallW");
      }
      if (this.y < this.size && this.allowedIdleAnimations.includes("scratchWallN")) {
        availableIdleAnimations.push("scratchWallN");
      }
      if (this.x > window.innerWidth - this.size && this.allowedIdleAnimations.includes("scratchWallE")) {
        availableIdleAnimations.push("scratchWallE");
      }
      if (this.y > window.innerHeight - this.size && this.allowedIdleAnimations.includes("scratchWallS")) {
        availableIdleAnimations.push("scratchWallS");
      }
      this.idleAnimation =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    switch (this.idleAnimation) {
      case "sleeping":
        if (this.idleAnimationFrame < this.yawnDuration) {
          this.setSprite("tired", 0);
          break;
        }
        this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 4));
        if (this.idleAnimationFrame > this.sleepDuration) {
          this.resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        this.setSprite(this.idleAnimation, this.idleAnimationFrame);
        if (this.idleAnimationFrame > this.scratchDuration) {
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

    if (distance < this.speed || distance < this.allowedTargetDistance) {
      this.idle();
      return this;
    }

    this.idleAnimation = null;
    this.idleAnimationFrame = 0;

    if (this.skipAlertAnimation === false) {
      if (this.idleTime > 1) {
        this.setSprite("alert", 0);
        // count down after being alerted before moving
        this.idleTime = Math.min(this.idleTime, this.maxAlertDuration);
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
    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.left = `${this.x - (this.size / 2)}px`;
    this.element.style.top = `${this.y - (this.size / 2)}px`;
    this.element.style.backgroundImage = `url(${this.source})`;
    this.element.style.backgroundSize = `${this.size * 8}px`;

    this.dispatchEvent(this.events.draw);

    return this;
  }

  isInitialized() {
    return this.initialized;
  }

  static canInitialize() {
    return !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
  }

  force() {
    if (!Oneko.canInitialize()) throw new Error("Oneko cannot be initialized");

    return this;
  }
}

export { Oneko };
