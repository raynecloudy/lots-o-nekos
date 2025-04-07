<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/lots-o-nekos.png" alt="lots-o-nekos">
  
  A JavaScript library building off of the popular [oneko.js](https://github.com/adryd325/oneko.js/) script! featuring speed configuration, custom Onekos, and other fun stuff!
</div>

> [!note]
> Unlike the [original script](https://github.com/adryd325/oneko.js), lots-o-nekos does not support IE6.

# Overview
Welcome to the `lots-o-nekos` GitHub repository! This project is a JavaScript library building off of [adryd325](https://github.com/adryd325/)'s [oneko.js](https://github.com/adryd325/oneko.js/) script. It features customization capabilities such as speed, custom Onekos, and more!

# Contributing
This project takes contributions from any and all! New features are always welcome, and there could always be more Onekos to choose from... if you're a pixel artist you should consider creating a custom Oneko for https://github.com/raynecloudy/oneko_db/ :3

# Installation
There are two possible methods of installation.

## From NPM
1. Install and import the `lots-o-nekos` package:
```bash
npm install lots-o-nekos
```
```ts
import Oneko from "lots-o-nekos";

const oneko = new Oneko();
```

## From GitHub
1. Download `lots-o-nekos.js` and your choice of cat from https://github.com/raynecloudy/oneko_db/ and place both files in your website's home directory.
2. Paste this code in the `body` tag of all HTML files:
```html
<script src="/lots-o-nekos.js"></script>
```
3. In a separate script, write some code with the library!

# Documentation

## `Oneko` class

### Constructors
`Oneko` objects are constructed using this syntax:
```js
new Oneko();
```

### Parameters
Parameter|Meaning
---------|-------
`element`|An HTMLDivElement used to represent the Oneko in the document.
`frameCount`|How long the Oneko has been alive for. Measured by how many times the Oneko's `element` has been updated.
`idleTime`|How long the Oneko has been idle for. Measured by how many times the Oneko's `element` has been updated.
`source`|The path to an image file used to represent the Oneko, as a string.
`speed`|How far the Oneko runs per update, in pixels.
`spriteSets`|A keyed list of arrays of points ([number, number]), defined as animations.
`targetX`|The X position the Oneko is running towards, in pixels.
`targetY`|The Y position the Oneko is running towards, in pixels.
`updateSpeed`|How fast the Oneko updates its animations, in milliseconds.
`x`|The Oneko's `element`'s position on the X axis, in pixels.
`y`|The Oneko's `element`'s position on the Y axis, in pixels.
`_lastFrameTimestamp`|The timestamp of the last time the Oneko's `element` was updated.
`_events`|A keyed list of Events fired by the Oneko object.

### Functions
Function|Meaning
--------|-------
`setTarget(x: number, y: number): void`|Set the coordinates for the Oneko to run to. `x` and `y` are pixel values.
`_onAnimationFrame`|Runs every frame. Enables Oneko animations.
`_setSprite`|Sets the sprite image to a given frame of a given animation.
`_resetIdleAnimation`|Resets the idle animation.
`_idle`|Controls idle animation logic (scratching, sleeping, etc.)
`_frame`|Controls all animation logic.
`_draw`|Renders the Oneko using its `element`. Fires the `draw` event after completion.
``|

### Events
Event|Fired when...
-----|-------------
`draw`|Oneko is drawn
`startRunning`|Target coordinate becomes outside range, after alert animation plays
`stopRunning`|Target coordinate becomes inside range

<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/bar-cat.gif" alt="oneko running">
</div>
