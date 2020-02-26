---
title: "ES6 DOM Scripting Tricks"
date:   "2017-01-12"
tags: [ "javascript", "browser" ]
categories:
    - javascript
slug: "es6-dom-scripting-tricks"
thumbnail: /images/thumbnails/javascript.png
---

In this post we are going to make use of some ES6 features in regards to DOM scripting.
Features like destructuring, the spread operator, and the `for..of` loop lend themselves 
well to DOM scripting.

<!--more-->

I have put together examples below, I hope that they will prove useful to you.

 - [Using Destructuring to Select Elements By ID](#using-destructuring-to-select-elements-by-id)
 - [Convert a NodeList to an Array](#convert-a-nodelist-to-an-array)
 - [Iterating a NodeList using the For..Of Loop](#iterating-a-nodelist-with-the-for-of-loop)
 - [Check if an Element Has a Certain Class](#check-if-an-element-has-a-certain-class)

---

## Using Destructuring to Select Elements By ID

Did you know that element ids get stored as global variables?

Every element id in the DOM gets attached to the `window` object.
Let's say you have an `article` tag with an id of `my_article`.
This `article` element will get attached to the `window` object with the key `my_article`.
Allowing us to use destructuring to _pluck_ that element from the `window` object.
You can see this in action below using both destructuring and a standard value assignment.

```html
<article id="my_article">
    <h1>Hello World</h1>
</article>
```
```javascript
// assign directly from the window object
const my_article = window.my_article

// or

// use object destructuring
const { my_article } = window

console.log(my_article) // the above article will get logged
```

Object destructuring is a much better approach.
It's more concise, it allows for renaming, and it allows for multiple assignments.
You can see an example of these below.

```html
<article id="first_article">
    <h1>First</h1>
</article>

<article id="second_article">
    <h1>Second</h1>
</article>

<article id="BADDLY formatted id">
    <h1>Third</h1>
</article>
```
```javascript
// multiple assignments
const { first_article, second_article } = window

// assign and rename
const { "BADDLY formatted id": renamed } = window

// logs the first two articles
console.log(first_article, second_article)
// logs the third article
console.log(renamed)
```

## Convert a NodeList to an Array

Let's say we have a list of articles that we need to iterate through.
Each article has a class of `blog-post` and we will select them using the following code.

```javascript
const articles = document.querySelectorAll(".blog-post")
```

The value of the `articles` variable is a `NodeList`.
To use array methods like `map`, `filter`, and `forEach` on this [David Walsh](DW) recommends 
doing one of the following to convert the `NodeList` to an `Array`.

```javascript
var nodesArray = Array.prototype.slice.call(document.querySelectorAll("div"));

// or

var nodesArray = [].slice.call(document.querySelectorAll("div"));
```

If you are using ES5 then this is a valid approach.
ES6 makes this much easier by introducing the spread operator.

Using the spread operator we can covert the `NodeList` to an `Array` using the following code.

```javascript
// select the blog-posts
const articles = document.querySelectorAll(".blog-post")

// use spread operator to convert `articles` to an array
const nodesArray = [...articles]

// we can now use array methods on the NodeList
nodesArray
    .filter(node => node.classList.contains('some-class'))
    .forEach(node => node.classList.toggle('some-class'))
```

## Iterating a NodeList With The `for..of` Loop

Although I recommend the above approach when iterating a `NodeList` it's also achievable using the 
`for..of` loop.
The `for..of` loop allows you to iterate over arrays, strings, and any other iterable.

We can see an example of this used to iterate an unordered list below.

```html
<ul>
  <li class="list-item">1</li>
  <li class="list-item">2</li>
  <li class="list-item">3</li>
  <li class="list-item">4</li>
  <li class="list-item">5</li>
</ul>
```

```javascript
const listItems = document.querySelectorAll('.list-item')

// loop through the NodeList
for(let item of listItems) {
  // logs the list item
  console.log(item) 
}

// or

// loop through getting the item and it's index
for(let [index, item] of listItems.entries()) {
  // logs the list item and it's index
  console.log(index, item)
}

```

## Check if an Element Has a Certain Class

ES6 has introduced some useful array methods to the language.
Notably the `contains` method.
This checks if the given value is present in an array and returns a boolean value.

We can use this to check if an element has a certain attribute or class as shown in the example below.

```javascript
// select the button with an id of 'submit_button'
const { submit_button } = window
// check if it has the 'disabled' class
const isDisabled = submitButton.classList.contains('disabled')

if(isDisabled) {
    // do something
}
```


[DW]: https://davidwalsh.name/nodelist-array
[noJquery]: http://youmightnotneedjquery.com/