<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/lots-o-nekos.png" alt="lots-o-nekos">
  
  a javascript library building off of the popular [oneko.js](https://github.com/adryd325/oneko.js/) script! featuring speed configuration, custom onekos, and other fun stuff!
</div>

# overview
welcome to the lots-o-nekos github repository! this project contains a modified version of [adryd325](https://github.com/adryd325/)'s [oneko.js](https://github.com/adryd325/oneko.js/) script. it features customization capabilities such as speed, custom onekos, and more!

# contributing
this project takes contributions from any and all! new features are always welcome, and there could always be more onekos to choose from... if you're a pixel artist you should consider creating an custom oneko for this project :3

# installation
1. download `/lots-o-nekos.js` and your choice of cat from the `/cats/` diraectory and place both files in your website's home directory.
2. paste this code in the `body` tag of all HTML files:
```html
<script src="/lots-o-nekos.js"></script>
```
3. open `lots-o-nekos.js` and mess with configurations located at the top of the file.

# how to configure
> [!IMPORTANT]
> all fields MUST be filled out for the script to run properly.

## `amount`: number
the number of onekos to display on the page.

1 oneko:

![1 oneko](https://github.com/user-attachments/assets/0165998c-de48-4b12-aa21-0d9e182087c8)

2 onekos:

![2 onekos](https://github.com/user-attachments/assets/ea55aaab-72da-498a-bb48-daa454992006)

10,000 onekos:

![10,000 onekos](https://github.com/user-attachments/assets/302005d4-e5b3-4c23-b33e-8b6b95a155d2)

> [!WARNING]
> please don't put 10,000 onekos on your site.

## `sources`: string[]
a list of paths to files. controls what the oneko looks like. it's a list for the purpose of randomization

## `speed`: number
how fast onekos run. measured in pixels.

## `update_speed`: boolean
how fast onekos update their animations. measured in milliseconds.