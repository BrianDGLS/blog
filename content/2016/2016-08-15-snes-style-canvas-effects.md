---
title: "Fire, Snow, and Rain Canvas Effects"
date:   "2016-08-15"
tags: [ "javascript", "canvas", "typescript" ]
categories:
  - javascript
slug: "snes-style-canvas-effects"
thumbnail: /images/thumbnails/javascript.png
---


All three of the demos below are written in Typescript and make use of the browser's canvas element.
No external libraries are used and each example is made up of around 100 lines of code.

<!--more-->

<a class="github-button"
  href="https://github.com/BrianDGLS/snes-style-canvas-effects" data-style="mega"
  data-count-href="/BrianDGLS/snes-style-canvas-effects/stargazers"
  data-count-api="/repos/BrianDGLS/snes-style-canvas-effects#stargazers_count"
  data-count-aria-label="# stargazers on GitHub"
  aria-label="Star BrianDGLS/snes-style-canvas-effects on GitHub">Star</a>

<style>
#snowCanvas {
  background: linear-gradient(180deg, rgb(84, 114, 195), rgb(125, 205, 178));
}

#fireCanvas {
  background: linear-gradient(180deg, rgb(125, 0, 208), rgb(255, 84, 55));
}

#rainCanvas {
  background: linear-gradient(180deg, rgb(84, 14, 195), rgb(30, 0, 30));
}
</style>

## Snow

<canvas id="snowCanvas"></canvas>

[view source](https://github.com/BrianDGLS/snes-style-canvas-effects/blob/master/app/effects/snow.ts)

## Rain

<canvas id="rainCanvas"></canvas>

[view source](https://github.com/BrianDGLS/snes-style-canvas-effects/blob/master/app/effects/rain.ts)

## Fire

<canvas id="fireCanvas"></canvas>

[view source](https://github.com/BrianDGLS/snes-style-canvas-effects/blob/master/app/effects/fire.ts)

_All code is available on github at the below link_

[https://github.com/BrianDGLS/snes-style-canvas-effects](https://github.com/BrianDGLS/snes-style-canvas-effects)


<script async defer src="https://buttons.github.io/buttons.js"></script>
<script>
var Utils={getCanvas:function(b){b=document.getElementById(b);var a=b.getContext("2d"),c=b.width=400,d=b.height=550;return{c:b,$:a,w:c,h:d}},randomNumber:function(b,a){return Math.floor(Math.random()*(a-b+1))+b},Sin:function(b,a,c,d){return d?b+Math.sin(a)*c:b-Math.sin(a)*c},Cos:function(b,a,c,d){return d?b+Math.cos(a)*c:b-Math.cos(a)*c}},Snow=function(){function b(a,c){void 0===c&&(c=30);this.arr=[];this.$=a.$;this.w=a.w;this.h=a.h;this.amount=c;this.generate();this.init()}b.prototype.config=function(a){return{id:a,
x:0,y:0,vx:0,vy:0,alpha:.1,angle:0}};b.prototype.generate=function(){var a,c;for(a=0;a<this.amount;++a)c=this.config(a),this.arr.push(c)};b.prototype.reset=function(a){a=this.arr[a];a.init=!1;a.x=Utils.randomNumber(0,this.w);a.y=Utils.randomNumber(0,this.h/3);a.vy=Utils.randomNumber(.5,1.5);a.vx=Utils.randomNumber(.1,.5);a.alpha=Utils.randomNumber(.1,.5)};b.prototype.tick=function(a){var c=a;a=this.arr[a];this.$.fillStyle="rgba(255,255,255,"+a.alpha+")";0===a.id%2?this.$.fillRect(a.x,a.y,3,3):this.flake(a);
a.y+=a.vy;a.x=0===a.id%2?Utils.Sin(a.x,a.angle,1,!0):Utils.Cos(a.x,a.angle,.5,!0);a.angle+=.01;a.alpha=a.init?a.alpha-.01:a.alpha+.01;0>=a.alpha?this.reset(c):1<=a.alpha&&(a.init=!0)};b.prototype.flake=function(a){this.$.save();this.$.translate(a.x,a.y);for(var c=0;3>c;c++)for(var b=0;3>b;b++){var e=3*b,f=3*c;this.$.fillStyle=0==c%2?0==b%2?"transparent":"rgba(255,255,255, "+a.alpha+")":0==b%2?"rgba(255,255,255, "+a.alpha+")":"transparent";this.$.fillRect(e,f,3,3)}this.$.fill();this.$.restore()};b.prototype.render=
function(){var a;this.$.clearRect(0,0,this.w,this.h);for(a=0;a<this.arr.length;++a)this.tick(a);window.requestAnimationFrame(this.render.bind(this))};b.prototype.init=function(){var a;for(a=0;a<this.arr.length;++a)this.reset(a);this.render()};return b}(),Fire=function(){function b(a,b){void 0===b&&(b=90);this.arr=[];this.$=a.$;this.w=a.w;this.h=a.h;this.amount=b;this.generate();this.init()}b.prototype.config=function(a){return{id:a,x:0,y:0,vx:0,vy:0,alpha:.1,angle:0}};b.prototype.generate=function(){for(var a=
0;a<this.amount;++a){var b=this.config(a);this.arr.push(b)}};b.prototype.reset=function(a){a=this.arr[a];a.init=!1;a.x=Utils.randomNumber(0,this.w);a.y=Utils.randomNumber(this.h/2,this.h);a.vy=Utils.randomNumber(.5,1.5);a.vx=Utils.randomNumber(.1,.5);a.alpha=Utils.randomNumber(.1,.5)};b.prototype.tick=function(a){var b=a;a=this.arr[a];this.$.fillStyle="rgba(255,170,100, "+a.alpha+")";0===a.id%2?this.$.fillRect(a.x,a.y,3,3):this.spark(a);a.y-=a.vy;a.x=0===a.id%2?Utils.Sin(a.x,a.angle,1,!0):Utils.Cos(a.x,
a.angle,.5,!0);a.angle+=.01;a.alpha=a.init?a.alpha-.01:a.alpha+.01;0>=a.alpha?this.reset(b):1<=a.alpha&&(a.init=!0)};b.prototype.spark=function(a){this.$.save();this.$.translate(a.x,a.y);for(var b=0;3>b;b++)for(var d=0;3>d;d++){var e=3*d,f=3*b;this.$.fillStyle=0==b%2?0==d%2?"transparent":"rgba(255,100,100, "+a.alpha+")":0==d%2?"rgba(255,100,100, "+a.alpha+")":"transparent";this.$.fillRect(e,f,3,3)}this.$.fill();this.$.restore()};b.prototype.render=function(){this.$.clearRect(0,0,this.w,this.h);for(var a=
0;a<this.arr.length;++a)this.tick(a);window.requestAnimationFrame(this.render.bind(this))};b.prototype.init=function(){for(var a=0;a<this.arr.length;++a)this.reset(a);this.render()};return b}(),Rain=function(){function b(a,b){void 0===b&&(b=100);this.arr=[];this.$=a.$;this.w=a.w;this.h=a.h;this.amount=b;this.generate();this.init()}b.prototype.config=function(a){return{id:a,x:0,y:0,vx:0,vy:0,alpha:.1,angle:0}};b.prototype.generate=function(){for(var a=0;a<this.amount;++a){var b=this.config(a);this.arr.push(b)}};
b.prototype.reset=function(a){a=this.arr[a];a.init=!1;a.x=Utils.randomNumber(0,this.w);a.y=Utils.randomNumber(-200,this.h/3);0===a%2?(a.vy=Utils.randomNumber(5.5,8.5),a.vx=Utils.randomNumber(.1,2.5)):(a.vy=Utils.randomNumber(2.5,5.5),a.vx=Utils.randomNumber(2.1,3.5));a.alpha=Utils.randomNumber(.1,.5)};b.prototype.tick=function(a){var b=a;a=this.arr[a];this.$.fillStyle="rgba(155,155,255, "+a.alpha+")";a.y+=a.vy;0===a.id%2?(this.$.fillRect(a.x,a.y,1,5),a.x=Utils.Sin(a.x,a.angle,.5,!0)):(this.$.fillRect(a.x,
a.y,2,5),a.x=Utils.Cos(a.x,a.angle,.5,!0));a.alpha=a.init?a.alpha-.01:a.alpha+.01;a.angle+=.01;0>=a.alpha?this.reset(b):1<=a.alpha&&(a.init=!0)};b.prototype.render=function(){this.$.clearRect(0,0,this.w,this.h);for(var a=0;a<this.arr.length;++a)this.tick(a);window.requestAnimationFrame(this.render.bind(this))};b.prototype.init=function(){for(var a=0;a<this.arr.length;++a)this.reset(a);this.render()};return b}();
window.addEventListener("DOMContentLoaded",function(){new Snow(Utils.getCanvas("snowCanvas"));new Fire(Utils.getCanvas("fireCanvas"));new Rain(Utils.getCanvas("rainCanvas"))},!1);
</script>
