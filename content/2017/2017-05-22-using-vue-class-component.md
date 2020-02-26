---
title: "Using Vue Class Components"
date:   "2017-05-22"
tags: [ "javascript", "vue" ]
categories:
    - vue
slug: "using-vue-class-components"
thumbnail: /images/thumbnails/vue.png
---

The [Vue Class Component][vcc] module provides a component decorator which can inject properties into [Vue][vue] components.
This allows developers to create components which make use of javascript's natural language constructs.
The more native syntax helps with readability and developer understanding.
Which ultimately contributes to maintainability.

<!--more-->

>This article will explain the basic usage of Vue class components.
The article has been written with Vue 2 in mind.

## Example Components

Let's say we have a simple Vue _greeter_ component.
This component will greet a user when they land on our webpage.
Using the standard Vue syntax this component may look like the following example.

```javascript
import Vue from "vue";

Vue.component("greeter", {
  template: require("./greeter.html"),
  props: { propMessage: String },
  computed: {
    computedMessage() {
      return "computed " + this.msg;
    }
  },
  methods: {
    greet() {
      alert("greeting: " + this.msg);
    }
  },
  mounted() {
    this.greet();
  },
  data() {
    return {
      msg: 123,
      helloMsg: "Hello, " + this.propMessage
    };
  }
});
```

The above uses Vue's `Vue.component` function to create a Vue component.
The first argument is the component's name the second is the component's config object.
In the example two special functions `mounted` and `data` are attached directly to the inserted object.
User defined methods are assigned to the `methods` object and computed properties are added to the `computed` object.
The object returned from the data function is then treated as the component's state which inherits any properties added to the `props` object.
It's important to note that the component's `name`, `template`, and `props` will not change once the component has been created.
Non-changing properties like these will be defined inside the `@Component()` decorator in the example below.

In the Vue class component below both the special methods and user defined methods are added directly to the component class.
Computed properties use the ECMAScript `get` and `set` language constructs.
This provides a more natural way of using computed properties.

The `data` function is not used in the class component.
The reason for this is that the properties that would have been returned from the `data` function can be added directly to the class.
This is a more native way of assigning properties, as properties are accessed via the `this` keyword in Vue.

For a javascript developer looking at the first example it would not be immediately 
apparent that the properties of the object returned from the `data` function could be accessed via the `this` keyword.
In the below example however the javascript's natural constructs are used.
Meaning that a knowledge of the Vue framework is not immediately required to understand this component.

>The example below is taken from the Vue Class Component docs, found [here][vccExample].

```javascript
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "greeter",
  template: require("./greeter.html"),
  props: { propMessage: String }
})
export default class App extends Vue {
  // initial data
  msg = 123;

  // use prop values for initial data
  helloMsg = "Hello, " + this.propMessage;

  // lifecycle hook
  mounted() {
    this.greet();
  }

  // computed
  get computedMsg() {
    return "computed " + this.msg;
  }

  // method
  greet() {
    alert("greeting: " + this.msg);
  }
}
```

## Summary

The [Vue Class Component][vcc] module allows developers to write Vue components which 
make more use of javascript's builtin features.
This offers a number of advantages when creating Vue applications.
It means that developers which have an understanding of javascript and not Vue are more likely to understand
what is going on in the app's code.

As stated above not only does this help with readability but it also contributes to maintainability 
and developer onboarding.

[vue]: https://github.com/vuejs/vue
[vcc]: https://github.com/vuejs/vue-class-component
[vccExample]: https://github.com/vuejs/vue-class-component#example