# lots-o-nekos Documentation

## `Oneko` class

### Constructors
`Oneko` objects are constructed using this syntax:
```js
new Oneko();
```

### Properties

#### `element: HTMLDivElement | null`
An HTMLDivElement used to represent the Oneko in the document.

Default value: `HTMLDivElement`

#### `events`
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
How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.

Default value: `0`

#### `idleAnimation: OnekoIdleAnimation`
The idle animation that's currently playing. `null` means the regular idle animation of being played.

Default value: `null`

#### `idleTime: number`
How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.

Default value: `0`

#### `lastFrameTimestamp: number`
The timestamp of the last time the Oneko's `element` was updated.

Default value: `0`

#### `recursiveAnimating: boolean`
Controls if `onAnimationFrame()` loops called after each completion of itself.

Default value: `true`

#### `skipAlertAnimation: boolean`
Controls if the alert animation is skipped before running begins.

Default value: `false`

#### `source: string`
The path to an image file used to represent the Oneko, as a string.

Default value: `"https://raw.githubusercontent.com/raynecloudy/oneko_db/refs/heads/master/default.png"`

#### `speed: number`
How far the Oneko runs per update, in pixels.

Default value: `10`

#### `spriteSets`
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
The X position the Oneko is running towards, in pixels.

Default value: `16`

#### `targetY: number`
The Y position the Oneko is running towards, in pixels.

Default value: `16`

#### `updateSpeed: number`
How fast the Oneko updates its animations, in milliseconds.

Default value: `100`

#### `x: number`
The Oneko's `element`'s position on the X axis, in pixels.

Default value: `16`

#### `y: number`
The Oneko's `element`'s position on the Y axis, in pixels.

Default value: `16`

### Methods

#### `draw(): void`
Renders the Oneko using its `element`. Fires the `draw` event after completion.

#### `frame(): void`
Controls all animation logic.

#### `idle(): void`
Controls idle animation logic (scratching, sleeping, etc.)

#### `onAnimationFrame(timestamp: number): void`
Runs every frame. Enables Oneko animations. `timestamp` is the duration since the last update.

#### `resetIdleAnimation(): void`
Resets the idle animation.

#### `setPosition(x: number, y: number): void`
Sets the coordinates for the Oneko element to be positioned at.

#### `setSourceDB(sourceName: OnekoDatabaseSource): void`
Sets the source image of the Oneko element to a URL accessing the source database of Oneko PNGs (https://github.com/raynecloudy/oneko_db/).

#### `setSprite(name: string, frame: number): void`
Sets the sprite image to a given frame of a given animation.

#### `setTarget(x: number, y: number): void`
Set the coordinates for the Oneko to run to. `x` and `y` are pixel values.

### Events

#### `draw`
Fires when the `draw` method is finished.

#### `startRunning`
Fires when the target coordinate becomes outside range, after alert animation plays.

####  `stopRunning`
Fires when target coordinate becomes inside range.