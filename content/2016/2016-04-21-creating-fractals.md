---
title: "Creating Fractals"
tags: [ "javascript", "canvas", "fractals" ]
date: "2016-04-21"
categories:
    - "javascript"
slug: "creating-fractals"
thumbnail: /images/thumbnails/koch-snowflake.png
---

Fractals show the beauty of numbers. There are many famous fractals, which are often named after European mathematicians. You may have heard of Sierpinski's Triangle, the Mandelbrot Set, and the Koch Curve. These are all fractal patterns.

<!--more-->

I'm going to show you how to create the Koch Snowflake using the Canvas element.

The Koch Snowflake is not technically a fractal. It is a shape made up of three Koch Curves. When these Koch Curves are positioned correctly they create a Koch Snowflake.

Let's create the function that draws a Koch Curve. We'll name it koch.

```javascript
const koch = (a, b, limit = 3) => {
    let [dx, dy] = [b.x - a.x, b.y - a.y]
    let dist = Math.sqrt(dx * dx + dy * dy)
    let unit = dist / 3
    let angle = Math.atan2(dy, dx)

    //This will be the triangular shape that makes the 'points' on the snowflake
    let p1 = {
        x: a.x + dx / 3,
        y: a.y + dy / 3
    }
    let p3 = {
        x: b.x - dx / 3,
        y: b.y - dy / 3
    }
    let p2 = {
        x: p1.x + Math.cos(angle - Math.PI / 3) * unit,
        y: p1.y + Math.sin(angle - Math.PI / 3) * unit
    }

    if (limit > 0) {
        // Decrease limit each time it's called
        koch(a, p1, limit - 1)
        koch(p1, p2, limit - 1)
        koch(p2, p3, limit - 1)
        koch(p3, b, limit - 1)
    } else {
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.lineTo(p3.x, p3.y)
        context.lineTo(b.x, b.y)
        context.stroke()
    }
}
```

The Koch function above takes two starting coordinates. These should be in the form of `{x: 90, y: 90}`. We'll use these coordinates to plot where the triangular 'curve' should be placed. You can see the coordinates for the triangle's points defined as `p1,p2,p3` inside the function.

The function will be called recursively, to create the fractal. We must ensure that an infinite loop is not formed. To prevent this we pass in a default limit of recursion. This can be changed. Changing it to a higher number, will add little visual difference.

To use this function and create the Koch Snowflake, we must add some more boilerplate code.

```javascript
(() => {
    // Create canvas element, that we will draw on
    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    const context = canvas.getContext('2d')
    const width = canvas.width = 420
    const height = canvas.height = 420

    // The starting cordinates, basically tilting the Koch Curve
    // so that when we add three together they form the snowflake
    const startingPoints = {
        p1: {
            x: 0,
            y: -150
        },
        p2: {
            x: 150,
            y: 100
        },
        p3: {
            x: -150,
            y: 100
        }
    }

    // Draw relative to center of the screen
    context.translate(.5 * width, .5 * height)

    // add a default limit of three as we don't want an infinite loop
    const koch = (a, b, limit = 3) => {
        let [dx, dy] = [b.x - a.x, b.y - a.y]
        let dist = Math.sqrt(dx * dx + dy * dy)
        let unit = dist / 3
        let angle = Math.atan2(dy, dx)

        //This will be the triangular shape that makes the 'point' of the curve
        let p1 = {
            x: a.x + dx / 3,
            y: a.y + dy / 3
        }
        let p3 = {
            x: b.x - dx / 3,
            y: b.y - dy / 3
        }
        let p2 = {
            x: p1.x + Math.cos(angle - Math.PI / 3) * unit,
            y: p1.y + Math.sin(angle - Math.PI / 3) * unit
        }

        if (limit > 0) {
            // Decrease limit each time it's called
            koch(a, p1, limit - 1)
            koch(p1, p2, limit - 1)
            koch(p2, p3, limit - 1)
            koch(p3, b, limit - 1)
        } else {
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(p1.x, p1.y)
            context.lineTo(p2.x, p2.y)
            context.lineTo(p3.x, p3.y)
            context.lineTo(b.x, b.y)
            context.stroke()
        }
    }

    // draw the shape using our predefined co-ordinates
    koch(startingPoints.p1, startingPoints.p2)
    koch(startingPoints.p2, startingPoints.p3)
    koch(startingPoints.p3, startingPoints.p1)

})()
```

If you have followed these examples correctly you should have something that looks like the following.
Note that I have added a recursion selector.

<style>
  .demo {
    text-align: center;
  }
</style>
<div class="demo">
  <label for="recursion">Level of Recursion</label>

  <select name="recursion" id="recursion">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5" selected>5</option>
      <option value="6">6</option>
      <option value="7">7</option>
  </select>

  <div id="canvas"></div>
</div>

<script>
(function(){var e=document.createElement('canvas');document.getElementById('canvas').appendChild(e);var c=e.getContext('2d'),q=e.width=420,r=e.height=420,m={x:0,y:-150},n={x:150,y:100},p={x:-150,y:100};c.translate(.5*q,.5*r);var a=function d(f,g){var a=2>=arguments.length||void 0===arguments[2]?3:arguments[2],b=g.x-f.x,l=g.y-f.y,h=Math.sqrt(b*b+l*l)/3,e=Math.atan2(l,b),k={x:f.x+b/3,y:f.y+l/3},b={x:g.x-b/3,y:g.y-l/3},h={x:k.x+Math.cos(e-Math.PI/3)*h,y:k.y+Math.sin(e-Math.PI/3)*h};0<a?(d(f,k,a-1),d(k,
h,a-1),d(h,b,a-1),d(b,g,a-1)):(c.beginPath(),c.moveTo(f.x,f.y),c.lineTo(k.x,k.y),c.lineTo(h.x,h.y),c.lineTo(b.x,b.y),c.lineTo(g.x,g.y),c.stroke())};a(m,n,5);a(n,p,5);a(p,m,5);var t=document.getElementById('recursion');t.onchange=function(){var d=t.options[t.selectedIndex].value;c.clearRect(-q/2,r/-2,q,r);a(m,n,d);a(n,p,d);a(p,m,d)}})();
</script>

_You can edit this example on codepen at the following url_
[http://codepen.io/BrianDGLS/pen/GZdLjj](http://codepen.io/BrianDGLS/pen/GZdLjj)

## Summary

It's true. I left out a lot of detail here. Fractals are both simple and complex, which makes them hard to explain. I can show you quite easily how to make a fractal, but explaining why certain numbers and methods work is much harder. I have been playing around with canvas fractals for a while and I am only just starting to get a feel for it.

If you are intrigued and want to learn more, I recommend looking at the mathematics behind fractals, as opposed to how to code them. The prior will lead to the latter.

I recommend checking out <a href="https://www.youtube.com/user/numberphile/videos">Numberphile</a> on YouTube. This channel does an awesome job of explaining complex maths. It's also a great source of inspiration for writing code.

Want a challenge? Using the methods I introduced above, try creating the <a href="https://en.wikipedia.org/wiki/Sierpinski_triangle">Sierpinski Triangle</a>. If you manage to do it post the result as a comment.
