---
title: "Canvas Fireworks Using Javascript"
date:   "2017-01-09"
tags: [ "javascript", "browser", "canvas" ]
categories:
    - javascript
slug: "canvas-fireworks-using-js"
thumbnail: /images/thumbnails/fireworks.png
---

This post is a tutorial explaining how to code a fireworks display using the canvas element.
No external libraries or frameworks will be necessary.

<!--more-->

At the end of this tutorial you will be able to code the example below.

<div class="demo" style="padding-bottom: 1em; text-align: center;">
<div class="user-input">
  <label for="fireWorkCount">Number of FireWorks</label>

  <select name="fireWorkCount" id="fireWorkCount">
    <option value="1" >1</option>
    <option value="5" >5</option>
    <option value="10" selected>10</option>
    <option value="20">20</option>
    <option value="30">30</option>
    <option value="40">40</option>
    <option value="50">50</option>
  </select>
</div>

<canvas id="canvas"></canvas>

<!-- Place this tag where you want the button to render. -->
<a class="github-button" href="https://github.com/BrianDGLS/canvas-fireworks" data-icon="octicon-star" data-style="mega" data-count-href="/BrianDGLS/canvas-fireworks/stargazers" data-count-api="/repos/BrianDGLS/canvas-fireworks#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star BrianDGLS/canvas-fireworks on GitHub">Star</a>
</div>

<script>
function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!==typeof b&&"function"!==typeof b?a:b}
function _inherits(a,b){if("function"!==typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}});b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function");}
var c=document.getElementById("canvas"),$=c.getContext("2d"),h=c.height=420,w=c.width=1.618*h;
var GRAVITY=.04,color=function(){return"hsla("+(0>=arguments.length||void 0===arguments[0]?0:arguments[0])+", "+(1>=arguments.length||void 0===arguments[1]?100:arguments[1])+"%, "+(2>=arguments.length||void 0===arguments[2]?100:arguments[2])+"%, "+(3>=arguments.length||void 0===arguments[3]?1:arguments[3])+")"},randomFloat=function(a,b){return Math.random()*(b-a)+a},randomNumber=function(a,b){return Math.floor(Math.random()*(b-a+1))+a},cleanFrame=function(a){$.globalCompositeOperation="source-over";
$.fillStyle="rgba(0,0,0,"+a+")";$.fillRect(0,0,w,h);$.globalCompositeOperation="lighter"},FireWork=function(){function a(b){var d=b.x,e=b.y,f=b.vx,g=b.vy,k=b.size;b=b.hue;_classCallCheck(this,a);this.setPosition(d,e);this.setVelocity(f,g);this.size=k;this.hue=b||0;this.alpha=1}a.prototype.setPosition=function(b,a){this.x=b;this.y=a};a.prototype.setVelocity=function(b,a){this.vx=b;this.vy=a};a.prototype.render=function(){$.fillStyle=color(this.hue,50,50,this.alpha);$.beginPath();$.arc(this.x,this.y,
this.size,0,2*Math.PI);$.fill()};return a}(),ExplodingFireWork=function(a){function b(d){_classCallCheck(this,b);d=_possibleConstructorReturn(this,a.call(this,d));d.exploded=!1;d.explodePoint=randomNumber(100,h/2);return d}_inherits(b,a);b.prototype.update=function(){this.x+=this.vx;this.y+=this.vy;this.y<h/2&&(this.vy+=GRAVITY);!this.exploded&&(0<=this.vy||this.y<this.explodePoint)&&(explode(this),this.alpha=0,this.exploded=!0)};return b}(FireWork),FadingFireWork=function(a){function b(d){_classCallCheck(this,
b);return _possibleConstructorReturn(this,a.call(this,d))}_inherits(b,a);b.prototype.update=function(){this.x+=this.vx;this.y+=this.vy;this.vy+=GRAVITY;this.alpha&&(this.alpha-=.03)};return b}(FireWork),FireWorkDisplay=function(){function a(){var b=0>=arguments.length||void 0===arguments[0]?5:arguments[0];_classCallCheck(this,a);this.limit=b;this.fireworks=[]}a.prototype.add=function(b){this.fireworks.push(b)};a.prototype.remove=function(b){this.fireworks=this.fireworks.filter(function(a){return a!==
b})};a.prototype.render=function(){this.fireworks.map(function(a){return a.render()})};a.prototype.update=function(){var a=this;this.fireworks.map(function(b){b.update();0>=b.alpha&&a.remove(b);b.exploded&&a.remove(b)})};return a}(),STAGE=new FireWorkDisplay(10);
function igniteNewFireWork(){var a=[randomNumber(0,20),randomNumber(10,30),randomNumber(60,80),randomNumber(250,280)],a=new ExplodingFireWork({x:randomNumber(w/2-100,w/2+100),y:h,vx:randomFloat(-1,1),vy:-1*randomFloat(2,4),size:randomNumber(1,3),hue:a[randomNumber(0,a.length-1)]});STAGE.add(a)}function explode(a){for(var b=0;10>b;++b){var d=new FadingFireWork({x:a.x,y:a.y,vx:4*Math.cos(2*Math.PI*b/10),vy:4*Math.sin(2*Math.PI*b/10),size:a.size+1,hue:a.hue});STAGE.add(d)}}
function draw(){requestAnimationFrame(draw);cleanFrame(.1);STAGE.fireworks.filter(function(a){return!a.exploded}).length<STAGE.limit&&igniteNewFireWork();STAGE.update();STAGE.render()}function startFireWorkDisplay(){$.fillStyle="#000";$.fillRect(0,0,w,h);var a=document.getElementById("fireWorkCount");a.onchange=function(){STAGE.limit=a.options[a.selectedIndex].value};draw()}startFireWorkDisplay();
</script>

## Boilerplate and Utilities

Firstly lets create the files needed for this project.
Make a directory called `fireworks_display` and add the following two files inside it `index.html` and `fireworks.js`.
If you are on mac osx you can create these with the following commands.

```
mkdir fireworks_display;
cd fireworks_display;
touch index.html fireworks.js;
```

Now in the `index.html` file add the following.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>FireWorks Display</title>
    <style>
      html, body {
        height: 100%;
        width: 100%;
      }

      body {
        margin: 0 auto;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="user-input">
      <label for="fireWorkCount">Number of FireWorks</label>

      <select name="fireWorkCount" id="fireWorkCount">
        <option value="1" >1</option>
        <option value="5" >5</option>
        <option value="10" selected>10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
    <script src="fireworks.js"></script>

  </body>
</html>
```

Turning to the `fireworks.js` file we will setup a canvas element and some utility functions.
Paste the following code into `fireworks.js`.

```javascript
const c = document.createElement('canvas')
const $ = c.getContext('2d')
const h = c.height = 420
const w = c.width = h * 1.618

document.body.appendChild(c)

const GRAVITY = 0.04

const color = (h = 0, s = 100, l = 100, a = 1) => `hsla(${h}, ${s}%, ${l}%, ${a})`

const randomFloat = (min, max) => Math.random() * (max - min) + min

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const cleanFrame = (opacity) => {
  $.globalCompositeOperation = 'source-over'
  $.fillStyle = `rgba(0,0,0,${opacity})`
  $.fillRect(0, 0, w, h)
  $.globalCompositeOperation = 'lighter'
}
```

In the above code we create the canvas element and append it to the DOM's body tag.
The `$` variable refers to the canvas's context which we will use to render our fireworks.

The four utility functions are as follows.

  - **color**: Returns a random color in the form of a `hsla` string
  - **randomNumber**: Returns a random number  
  - **randomFloat**: Returns a random float
  - **cleanFrame**: This will draw a black square on the canvas screen allowing for the next frame to render.
  Lowering the opacity will create a nice _trail_ effect for our fireworks.

With these in place, the next section will cover the `FireWork` classes.

## Creating the FireWorks

Our fireworks consist of three different classes.
There will be two variants of firework, `ExplodingFireWork` and `FadingFireWork`.
These will both extend the main `FireWork` class.

If you have used canvas before you may have created particles.
Our main `FireWork` class is essentially a particle.
It has `x` and `y` co-ordinates which update based on it's velocity, `vy` and `vx`.
It also contains a `render` method which will allow it to render on the canvas.

Add the following to `fireworks.js`.

```javascript
class FireWork {
  constructor({
    x,
    y,
    vx,
    vy,
    size,
    hue
  }) {
    this.setPosition(x, y)
    this.setVelocity(vx, vy)

    this.size = size

    this.hue = hue || 0
    this.alpha = 1
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  setVelocity(vx, vy) {
    this.vx = vx
    this.vy = vy
  }

  render() {
    $.fillStyle = color(this.hue, 50, 50, this.alpha)
    $.beginPath()
    $.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    $.fill()
  }
}
```

The `ExplodingFireWork` and `FadingFireWork` classes are going to extend the above class.
This will allow for better code reuse.
It also means that we will have to create an `update` method for our inheriting classes.
The `update` method will be unique to each as both will have slightly different animations.

Let's add the `ExplodingFireWork` to `fireworks.js`.

```javascript
class ExplodingFireWork extends FireWork {
  constructor(options) {
    super(options)

    this.exploded = false
    this.explodePoint = randomNumber(100, h / 2)
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.y < h / 2) this.vy += GRAVITY

    if (!this.exploded) {
      if (this.vy >= 0 || this.y < this.explodePoint) {
        explode(this)

        this.alpha = 0
        this.exploded = true
      }
    }
  }
}
```

The `super` function inside the constructor allows us to pass the `options` to the constructor of the class thats extended.
This sets the `x`, `y`, `vx`, `vy`, `size` and `hue` of the firework.
The `ExplodingFireWork` has two new attributes `exploded` and `explodePoint`.
The `explodePoint` is a random number more than halfway up the screen.
Once the `y` value matches this point the firework will explode.
The exploded boolean allows us to filter out fireworks that have exploded.

Now to the `FadingFireWork`.

```javascript
class FadingFireWork extends FireWork {
  constructor(options) {
    super(options)
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    this.vy += GRAVITY

    if (this.alpha) {
      this.alpha -= 0.03
    }
  }
}
```

The `FadingFireWork` acts as the ember of the `ExplodingFireWork`.
It's `alpha` property decreases each frame causing a fade animation.

## Creating the FireWork Display

To manage our fireworks we will create a class named `FireWorkDisplay`.
This class will be in charge of adding, removing, updating, and rendering our fireworks.
It will act as the `STAGE` of our animation.
As well as this we will add two new helper functions `igniteNewFireWork` and `explode`.

 - **igniteNewFireWork**: Adds an `ExplodingFireWork` to the `FireWorkDisplay`
 - **explode**: Creates the exploding animation of the `ExplodingFireWork` by adding 10 `FadingFireWork` objects at
 certain points of the exploding firework's radius. It uses `Math.sin` and `Math.cos` to send these fireworks in
 a circular motion.

Add these by pasting the following code into `fireworks.js`.

```javascript
class FireWorkDisplay {
    constructor(limit = 5) {
        this.limit = limit
        this.fireworks = []
    }

    add(firework) {
        this.fireworks.push(firework)
    }

    remove(firework) {
        this.fireworks = this.fireworks.filter(x => x !== firework)
    }

    render() {
        this.fireworks.map(x => x.render())
    }

    update() {
        this.fireworks.map(x => {
            x.update()
            if (x.alpha <= 0) this.remove(x)
            if (x.exploded) this.remove(x)
        })
    }
}

const STAGE = new FireWorkDisplay(10)

function igniteNewFireWork() {
    const hues = [
        randomNumber(0, 20),
        randomNumber(10, 30),
        randomNumber(60, 80),
        randomNumber(250, 280)
    ]

    const firework = new ExplodingFireWork({
        x: randomNumber(w / 2 - 100, w / 2 + 100),
        y: h,
        vx: randomFloat(-1, 1),
        vy: randomFloat(2, 4) * -1,
        size: randomNumber(1, 3),
        hue: hues[randomNumber(0, hues.length - 1)]
    })

    STAGE.add(firework)
}

function explode(firework) {
    const embers = 10
    const radius = 4

    for (let i = 0; i < embers; ++i) {
        const ember = new FadingFireWork({
            x: firework.x,
            y: firework.y,
            vx: radius * Math.cos(2 * Math.PI * i / embers),
            vy: radius * Math.sin(2 * Math.PI * i / embers),
            size: firework.size + 1,
            hue: firework.hue
        })

        STAGE.add(ember)
    }
}
```

The `STAGE` constant in the above codes acts as the manager of our fireworks display.
You can think of each firework as being an actor on the `STAGE`.

## Render the FireWorks Display

Here comes the exciting part, seeing the fireworks display on canvas.

Paste the following code into `fireworks.js`.

```javascript
function draw() {
    requestAnimationFrame(draw)
    cleanFrame(0.1)

    if (STAGE.fireworks.filter(x => !x.exploded).length < STAGE.limit) {
        igniteNewFireWork()
    }

    STAGE.update()
    STAGE.render()
}

function startFireWorkDisplay() {
    $.fillStyle = '#000'
    $.fillRect(0, 0, w, h)

    // Add user input
    const input = document.getElementById('fireWorkCount')

    input.onchange = () => {
        STAGE.limit = input.options[input.selectedIndex].value
    }

    draw()
}

startFireWorkDisplay()
```

The `draw` function above executes 60 times each second and is the function that renders each frame of the animation.
It checks to see if the number of unexploded fireworks is less than the max number in the firework display.
If this is true it will call `igniteNewFireWork` adding another `ExplodingFireWork` to the display.

The `startFireWorkDisplay` function starts the animation by calling `draw`.
It also adds an event listener to our firework count selector.
This allows the user to control the number of fireworks in the display.

## Summary

You should now have an animation that matches the demo at the start of this post.

In this tutorial there is a lot that has been learned.
It gives an example of using inheritance in javascript to extend a base class.
It also gives a strong use case for it.
Which is to allow for more concise and reusable code.

You will also have learned how to structure a canvas animation, using a `STAGE` to add and remove actors.

As well as this experience has been gained using the canvas api.
For example the `cleanFrame` function that is used to create the trailing effect of the firework is a neat little trick to add to your arsenal.

I hope you have found this useful.
If you haven't or if you have found any errors then please raise them as a github issue at the link below.

_The above code is held on github and editable on codepen at the links below_

[https://github.com/BrianDGLS/canvas-fireworks](https://github.com/BrianDGLS/canvas-fireworks)

[https://codepen.io/BrianDGLS/pen/wgKKKJ](https://codepen.io/BrianDGLS/pen/wgKKKJ)

<!-- Place this tag in your head or just before your close body tag. -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
