---
title: "The Crockford Invocation"
date:   "2016-09-11"
tags: [ "javascript", "patterns", "functional" ]
categories:
  - javascript
slug: "the-crockford-invocation"
thumbnail: /images/thumbnails/javascript.png
---

In this post we are going to look at some common invocation patterns used in javascript. We will then examine how they can be improved using ES6 syntax.

<!--more-->

Now lets write a function that adds from two invocations, such that `add(3)(4)` results in 7.

```javascript
function add(x) {
    return function (y) {
        return x + y;
    };
}

add(3)(4) // 7
```

Now lets go slightly more complicated and write a function that takes a binary function, and makes it callable with two invocations.

This will result in something like `apply(add)(2)(2)` with the result being an integer.

```javascript
function multiply(x, y) {
    return x * y;
}

function apply(fn) {
    return function(x) {
        return function(y){
            return fn(x, y);
        };
    };
}

apply(multiply)(3)(4) // 12
```

As you can see our code is starting to look like a [pyramid of doom](https://goo.gl/GoFo5F). We can use arrow functions to solve this problem.

Lets take the first example `add(2)(2)`, using arrow functions this becomes a one liner.

```javascript
let add = (x) => (y) => x + y;

add(3)(4) // 7
```

Using the same approach the more complicated example can also be reduced down to one line of code.

```javascript
let multiply = (x, y) => x * y;

let apply = (fn) => (x) => (y) => fn(x, y);

apply(multiply)(3)(4) // 12
```

The original examples in this post are taken from [this presentation](https://youtu.be/hRJrp17WnOE) by [Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford).
