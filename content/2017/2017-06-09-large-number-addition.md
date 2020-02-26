---
title: "Large Number Addition in Javascript"
date:   "2017-06-09"
tags: [ "javascript" ]
categories:
    - javascript
slug: "large-number-addition"
thumbnail: /images/thumbnails/javascript.png
---

Javascript supports at most 53 bit integers. 
What this means is that integers larger than 53 bits lose precision.
This article will explain how to handle addition with integers larger than 53 bits in javascript.

<!--more-->

## Background

Whilst on [codewars.com][codewars] I came across the following [sum strings kata][kata].

```javascript
// Given the string representations of two integers, return the string representation of the sum of those integers.

// For example:

sumStrings('1','2') // => '3'

// A string representation of an integer will contain no characters besides the ten numerals "0" to "9".
```

This disceptively easy kata leverages the fact that javascript supports at most 53 bit integers.
The initial tests use small numbers.
Converting the given strings to integers and adding via the `+` operator is valid when using these smaller numbers.
When it comes to the tests involving integers larger than 53 bits however, this will fail.

One technique for handling large integers in javascript is to hold the integer as a string.
This works as a string can be much larger than 53 bits.
It is also the reason the aforementioned kata uses strings as input.

One of the first algorithm's learned at primary school is the basic addition algorithm.
This is demonstrated in the image below.

![example of addition from http://www.stoimen.com/blog/2013/01/07/computer-algorithms-adding-large-integers/](/images/addition.png)

*Above image from [http://www.stoimen.com][stoimen]*

Inorder to complete the sum strings kata this same algorithm will be used.
In the next section we will apply the basic addition algorithm inorder to pass the kata's tests.

## Implementation

In the following solution two functions are used.
The main `sumStrings` function will perform a check to see if both the input strings are `'0'`
and return `'0'` if so, as there is no computation necessary.
If the input needs computation the strings will be split into an array and handed to the `addition` function.
The `addition` function will then be recursively called.
Each recursive call will add the last two items of each array and carry over any leftovers to the next call.
When there are no items left in one of the arrays and no carrys present the accumulator will be returned.

```javascript
function addition(a, b, acc = '', carry = 0) {
  if (!(a.length || b.length || carry)) return acc.replace(/^0+/, '');

  carry = carry + (~~a.pop() + ~~b.pop());
  acc = carry % 10 + acc;
  carry = carry > 9;

  return addition(a, b, acc, carry);
}

function sumStrings(a, b) {
  if (a === '0' && b === '0') return '0';
  return addition(a.split(''), b.split(''));
}
```

The above solution can be found on github with tests at the following link, 
[https://github.com/BrianDGLS/sum-large-numbers][github].

## Summary

The sum strings kata is ranked kyu 4 on [codewars][codewars].
This means that it's considered to be difficult.
The reason for the difficulty is javascript's inability to handle integers larger than 53 bits.
Because of this it forces the developer to come up with a unique solution to the problem.
In doing so it teaches a valuable lesson of how to deal with large integers in javascript.

The basic addition algorithm used to solve the kata is one of the first learned at elementary/primary school.
Despite this implementing it in code is not straight forward.
Solutions can be made using while loops, for loops, and recursion.
Recursion however, feels the most appriate here.
This is due to the fact that carrys and accumulators are needed to apply the algorithm.
These two concepts are essential to recursion.
In this scenario recursion is also the most readable as it keeps the code concise and explicit.

## Further Reading

A strong explantion of using computer algorithms to perform addition on large numbers can be found on [www.stoimen.com][stoimen].

Dr. Axel Rauschmayer has also written a great post documenting large integers in Javascript and some of the problems faced.
The article is recommended reading for anyone interested in the subject and can be found [here][2ality].


[codewars]: https://codewars.com
[kata]: https://www.codewars.com/kata/sum-strings-as-numbers/javascript
[2ality]: http://2ality.com/2012/07/large-integers.html
[stoimen]: http://www.stoimen.com/blog/2013/01/07/computer-algorithms-adding-large-integers/
[github]: https://github.com/BrianDGLS/sum-large-numbers
