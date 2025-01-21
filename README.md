<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/lots-o-nekos.png" alt="lots-o-nekos">
  
  A JavaScript library building off of the popular [oneko.js](https://github.com/adryd325/oneko.js/) script! featuring speed configuration, custom Onekos, and other fun stuff!
</div>

> [!IMPORTANT]
> This project is early in development and backwards-incompatible updates will be common during this time. Sorry :(

# Overview
Welcome to the `lots-o-nekos` GitHub repository! This project is a JavaScript library building off of [adryd325](https://github.com/adryd325/)'s [oneko.js](https://github.com/adryd325/oneko.js/) script. It features customization capabilities such as speed, custom Onekos, and more!

# Contributing
This project takes contributions from any and all! New features are always welcome, and there could always be more Onekos to choose from... if you're a pixel artist you should consider creating a custom Oneko for https://github.com/raynecloudy/oneko_db/ :3

# Installation
1. Download `lots-o-nekos.js` and your choice of cat from https://github.com/raynecloudy/oneko_db/ and place both files in your website's home directory.
2. Paste this code in the `body` tag of all HTML files:
```html
<script src="/lots-o-nekos.js"></script>
```
3. In a separate script, write some code with the library!

# Documentation

## `Oneko` class

### Constructors
The following are permitted constructors for an `Oneko` object:
```js
new Oneko();
new Oneko(source);
new Oneko(startX, startY);
new Oneko(startX, startY, runSpeed);
new Oneko(startX, startY, source);
new Oneko(startX, startY, runSpeed, updateSpeed);
new Oneko(startX, startY, runSpeed, updateSpeed, source);
```
Argument|Meaning
--------|-------
`startX`|Where to spawn the Oneko on the X axis, in pixels. Default value is `100`.
`startY`|Where to spawn the Oneko on the Y axis, in pixels. Default value is `100`.
`runSpeed`|How fast the Oneko can run, in pixels. Default value is `10`.
`updateSpeed`|How fast the Oneko updates its animations, in milliseconds. Default value is `100`.
`source`|The path to an image file used to represent the Oneko, as a string. Default value is `https://raynecloudy.nekoweb.org/oneko.gif`. It is not recommended to keep this as default.

### Parameters
Parameter|Meaning
---------|-------
`element`|The Oneko's HTML element.
`frameCount`|How long the Oneko has been alive for, in frames.
`idleTime`|How long the Oneko has been idle for, in frames.
`source`|The path to an image file used to represent the Oneko, as a string.
`speed`|How fast the Oneko can run, in pixels.
`targetX`|The X position the Oneko is running towards, in pixels.
`targetY`|The Y position the Oneko is running towards, in pixels.
`updateSpeed`|How fast the Oneko updates its animations, in milliseconds.
`x`|The Oneko's position on the X axis, in pixels.
`y`|The Oneko's position on the Y axis, in pixels.

### Functions
Parameter|Meaning
---------|-------
`setTarget(x: number, y: number): void`|Set the coordinates for the Oneko to run to. `x` and `y` are pixel values.

<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/bar-cat.gif" alt="oneko running">
</div>