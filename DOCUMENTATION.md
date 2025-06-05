# lots-o-nekos Documentation

## `Oneko` class
> since: 1.0.0

### Constructors
`Oneko` objects are constructed using this syntax:
```ts
new Oneko(options: OnekoOptions);
```

### Properties

#### `element: HTMLDivElement | null`
> since: 1.0.0

An HTMLDivElement used to represent the Oneko in the document.

Default value: `HTMLDivElement`

#### `events`
> since: 2.3.0

A keyed list of Events fired by the Oneko object.

Default value:
```js
{
  "draw": new Event("draw"),
  "startRunning": new Event("startRunning"),
  "stopRunning": new Event("stopRunning")
};
```

#### `frameCount: number`
> since: 1.0.0

How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.

Default value: `0`

#### `idleAnimation: OnekoIdleAnimation`
> since: 1.0.0

The idle animation that's currently playing. `null` means the regular idle animation of being played.

Default value: `null`

#### `idleAnimationFrame: number`
> since: 1.0.0

The current frame of the playing idle animation.

Default value: `0`

#### `idleTime: number`
> since: 1.0.0

How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.

Default value: `0`

#### `initialized: boolean`
> readonly
> since: 2.3.0

Only `true` if the Oneko has been properly initialized. For example, if the `prefers-reduced-motion` media query is set to `reduce`, the Oneko will not initialize and `initialized` will be `false`.

#### `lastFrameTimestamp: number`
> read-only
> since: 2.3.0

The timestamp of the last time the Oneko's `element` was updated.

#### `loopAnimating: boolean`
> since: 2.2.0

Controls if `onAnimationFrame()` loops called after each completion of itself.

Default value: `true`

#### `skipAlertAnimation: boolean`
> since: 2.2.0

Controls if the alert animation is skipped before running begins.

Default value: `false`

#### `source: string`
> since: 1.0.0

The path to an image file used to represent the Oneko, as a string.

Default value: `"https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png"`

#### `speed: number`
> since: 1.0.0

How far the Oneko runs per update, in pixels.

Default value: `10`

#### `spriteSets`
> since: 1.0.0

A keyed list of arrays of points ([number, number]), defined as animations.

Default value:
```js
{
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
}
```

#### `targetX: number`
> since: 1.0.0

The X position the Oneko is running towards, in pixels.

Default value: `16`

#### `targetY: number`
> since: 1.0.0

The Y position the Oneko is running towards, in pixels.

Default value: `16`

#### `updateSpeed: number`
> since: 1.0.0

How fast the Oneko updates its animations, in milliseconds.

Default value: `100`

#### `x: number`
> since: 1.0.0

The Oneko's `element`'s position on the X axis, in pixels.

Default value: `16`

#### `y: number`
> since: 1.0.0

The Oneko's `element`'s position on the Y axis, in pixels.

Default value: `16`

### Methods

#### `draw(): Oneko`
> since: 2.3.0

Updates the Oneko element's position and image. Fires the `draw` event after completion.

#### `frame(): Oneko`
> since: 2.3.0

Controls all animation logic.

#### `idle(): Oneko`
> since: 2.3.0

Controls idle animation logic (scratching, sleeping, etc.)

#### `moveTo(x: number, y: number): Oneko`
> since: 2.3.0

Sets the Oneko's target coordinates and element position.

#### `onAnimationFrame(timestamp: number): Oneko`
> since: 2.3.0

Runs every frame. Enables Oneko animations. `timestamp` is the duration since the last update.

#### `resetIdleAnimation(): Oneko`
> since: 2.3.0

Resets the idle animation.

#### `setPosition(x: number, y: number): Oneko`
> since: 2.3.0

Sets the coordinates for the Oneko element to be positioned at.

#### `setSourceDB(sourceName: OnekoDatabaseSource): Oneko`
> since: 2.1.0

Sets the source image of the Oneko element to a URL accessing the source database of Oneko PNGs (https://github.com/raynecloudy/oneko_db/).

#### `setSprite(name: string, frame: number): Oneko`
> since: 2.3.0

Sets the sprite image to a given frame of a given animation.

#### `setTarget(x: number, y: number): Oneko`
> since: 1.0.0

Set the coordinates for the Oneko to run to. `x` and `y` are pixel values.

### Events

#### `draw`
> since: 1.1.0

Fires when the `draw` method is finished.

#### `startRunning`
> since: 2.0.0

Fires when the target coordinate becomes outside range, after alert animation plays.

####  `stopRunning`
> since: 2.0.0

Fires when target coordinate becomes inside range.

## `OnekoDatabaseSource` type (private)
> since: 2.3.0

Used as `Oneko.prototype.setSourceDB`'s `sourceName` argument's type.
```ts
type OnekoDatabaseSource = "ace" | "black" | "bunny" | "calico" | "default" | "eevee" | "esmeralda" | "fox" | "ghost" | "gray" | "jess" | "kina" | "lucy" | "maia" | "maria" | "mike" | "silver" | "silversky" | "snuupy" | "spirit" | "tora" | "valentine";
```

## `OnekoIdleAnimation` type (private)
> since 2.3.0

Used as `Oneko.prototype.idleAnimation`'s type.
```ts
type OnekoIdleAnimation = "sleeping" | "scratchSelf" | "scratchWallW" | "scratchWallN" | "scratchWallE" | "scratchWallS" | null;
```

## `OnekoOptions` type (private)
> since: 2.3.0

Used as the `Oneko` class constructor's `options` argument's type.
```ts
type OnekoOptions = {
  element?: HTMLDivElement | null,
  frameCount?: number,
  idleAnimation?: OnekoIdleAnimation,
  idleAnimationFrame?: number,
  idleTime?: number,
  loopAnimating?: boolean,
  skipAlertAnimation?: boolean,
  skipElementInit?: boolean, // Determines if the Oneko's element has automatic styling applied to it.
  source?: number,
  speed?: number,
  targetX?: number,
  targetY?: number,
  updateSpeed?: number,
  x?: number,
  y?: number
};
```

## `OnekoSpriteSetOptions` type (private)
> since: 2.4.0

Used as `Oneko.prototype.setSprite`'s `setName` argument's type.
```ts
type OnekoSpriteSetOptions = keyof typeof Oneko.prototype.spriteSets;
```
