<div align="center">
  <img src="https://raynecloudy.nekoweb.org/media/lots-o-nekos.png" alt="lots-o-nekos">
  
  a modified version of the popular [oneko.js](https://github.com/adryd325/oneko.js/) script! featuring colouring, speed, and other fun configurations!
</div>

# overview
welcome to the lots-o-nekos github repository! this project contains a modified version of [adryd325](https://github.com/adryd325/)'s [oneko.js](https://github.com/adryd325/oneko.js/) script. it features customization capabilities such as colouring, speed, and more!

# installation
1. download `lots-o-nekos.js` and `oneko.gif` and place both files in your website's home directory.
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

## `coloured`: boolean
whether to randomly colour onekos or leave them white.

![coloured onekos](https://github.com/user-attachments/assets/1e02779b-9c2f-47c4-87f1-2db532def9f4)

## `speed`: number
how fast onekos run. measured in pixels.

## `update_speed`: boolean
how fast onekos update their animations. measured in milliseconds.