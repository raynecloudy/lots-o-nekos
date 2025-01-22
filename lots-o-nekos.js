// original oneko.js: https://github.com/adryd325/oneko.js/
// modified edition: https://github.com/raynecloudy/lots-o-nekos/

class Oneko extends EventTarget {
  constructor() {
    super();

    const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReducedMotion) return;
    
    this.x = 100;
    this.y = 100;
    this.speed = 10;
    this.source = "https://raynecloudy.nekoweb.org/oneko.gif";
    this.updateSpeed = 100;
    
    this.element = document.createElement("div");
    this.element = document.body.appendChild(this.element);
    
    this.targetX = this.x;
    this.targetY = this.y;
    this.frameCount = 0;
    this.idleTime = 0;
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
    this.lastFrameTimestamp;
    
    this.events = {
      "draw": new Event("draw"),
      "start_running": new Event("start_running"),
      "stop_running": new Event("stop_running")
    };
    
    this.draw();

    this.spriteSets = {
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

    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    window.requestAnimationFrame(this.onAnimationFrame);
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!this.element.isConnected) {
      return;
    }
    if (!this.lastFrameTimestamp) {
      this.lastFrameTimestamp = timestamp;
    }
    if (timestamp - this.lastFrameTimestamp > this.updateSpeed) {
      this.lastFrameTimestamp = timestamp
      this.frame()
    }
    window.requestAnimationFrame(this.onAnimationFrame);
  }

  setSprite(name, frame) {
    const sprite = this.spriteSets[name][frame % this.spriteSets[name].length];
    this.element.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    this.draw();
  }

  resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
  }

  idle() {
    if (this.idleTime === 1) {
      this.dispatchEvent(this.events.stop_running);
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

    if (this.idleTime > 1) {
      this.setSprite("alert", 0);
      // count down after being alerted before moving
      this.idleTime = Math.min(this.idleTime, 7);
      this.idleTime -= 1;
      if (this.idleTime === 1) {
        this.dispatchEvent(this.events.start_running);
      }
      return;
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

  draw() {
    this.element.id = "oneko";
    this.element.ariaHidden = true;
    this.element.style.width = "32px";
    this.element.style.height = "32px";
    this.element.style.position = "fixed";
    this.element.style.pointerEvents = "none";
    this.element.style.imageRendering = "pixelated";
    this.element.style.left = `${this.x - 16}px`;
    this.element.style.top = `${this.y - 16}px`;
    this.element.style.zIndex = 2147483647;
    this.element.style.backgroundImage = `url(${this.source})`;

    this.dispatchEvent(this.events.draw);
  }
}
