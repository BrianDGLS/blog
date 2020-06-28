---
title: 'Embed an OpenLayers map'
date: '2020-06-05'
tags: ['maps']
categories:
  - javascript
slug: 'embed-an-ol-map'
published: false
---

Recently I have been working on a project that requires a map to display the location of various tourist attractions. To facilitate this I have used the [OpenLayers](https://www.npmjs.com/package/ol) node module with [OpenStreetMap](https://www.openstreetmap.org/). This post will document how to set up a map using OpenLayers as well as render icons and show information when an icon is clicked.

<!--more-->

## Set up

_Note_: These steps are documented with the assumption that they will be used in the context of a javascript project that uses a module bundler.

First things first, we will install the OpenLayers node module. To do this run the following command in your project root.

```
npm install --save ol
```

The version I am using at time of writing is `^6.3.1`.

## Render a map

Now that the `ol` module is installed, we will create a basic map. To do this we must first import the `Map` object from the `ol` module. This is instantiated with the `new` keyword and can take a config object as it's first argument. Within the config object we can set the center point of the map, the zoom level, the available interactions, the layers that will be rendered, and the target element of the map.

For the purpose of this demo we will add a html element with an id of `map` to our page. This element will be used to embed the map.

```html
<div id="map"></div>
```

```javascript
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Tile, Vector } from 'ol/layer'
import { defaults, DragRotateAndZoom } from 'ol/interaction'

import VectorSource from 'ol/source/Vector'

const source = new VectorSource({ features: [] })
const vectorLayer = new Vector({ source })
const map = new Map({
  interactions: defaults().extend([new DragRotateAndZoom()]),
  layers: [new Tile({ source: new OSM() }), vectorLayer],
  target: 'map',
  view: new View({
    center: fromLonLat(this.center),
    zoom: 7,
  }),
})
```

## Render icons

```javascript
const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
  }),
})

for (const [index, attraction] of data.entries()) {
  if (attraction.Longitude && attraction.Latitude) {
    const feature = new Feature({
      index,
      geometry: new Point(fromLonLat([attraction.Longitude, attraction.Latitude])),
    })

    // feature.setStyle(iconStyle);
    source.addFeature(feature)
  }
}
```

## Capture click event

```javascript
const displayFeatureInfo = (pixel) => {
  vectorLayer.getFeatures(pixel).then((features) => {
    var feature = features.length ? features[0] : undefined
    if (feature) {
      const index = feature.values_.index
      if (index in data) {
        this.attractionService.selectedAttraction$.next(data[index])
      }
    }
  })
}

map.on('click', (evt) => {
  displayFeatureInfo(evt.pixel)
})
```
