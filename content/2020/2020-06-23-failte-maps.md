---
title: 'Introducing Fáilte Maps'
date: '2020-06-23'
tags: ['maps']
categories:
  - javascript
slug: 'failte-maps'
published: true
---

Today I am launching the [_Fáilte Maps_](https://failte-maps.ie/) web app. This app makes use of data that has been made available by Fáilte Ireland on [data.gov.ie](https://data.gov.ie/organization/failte-ireland) under the [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/) license.

<!--more-->

![preview image of the Fáilte Maps app](/images/failte-maps.png)

## Background

I was made aware of data.gov.ie over a year ago. Since then I have been visiting the site on and off, hoping to find an interesting dataset. The site hosts all sorts of data in various formats. This data includes Irish car sales, domestic information, tourist attractions, and much more. I commend all involved for making this data public.

For me, it was Fáilte Ireland's data that stood out. I instantly had the idea to take the geo-location information provided and render it on a map of Ireland for all to see. This resulted in the creation of [_Fáilte Maps_](https://failte-maps.ie/).

## Tech Stack

Fáilte Maps is an Angular 9 application. It is hosted on Firebase. The integration between Angular and Firebase is also flawless and easy to use, Google has done an excellent job here.

I found Angular 9 to be a very rewarding framework. There were many tools and plugins available to handle the more mundane development tasks. This meant that I could focus on the functionality of the application.

[Open Street Maps](https://www.openstreetmap.org/) is used along with the awesome [OpenLayers](https://www.npmjs.com/package/ol) npm package to render the map of Ireland. Open Street Maps is an open source alternative to Google Maps. Although there was a steep learning curve, the OpenLayers package meant that I could easily integrate the map to the application as well as add functionality such as icons and popups.
