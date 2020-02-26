---
title: "Using Property Accessors"
date: "2018-02-11"
tags: [ "typescript", "angular", "javascript" ]
categories:
    - angular
slug: "using-property-accessors"
thumbnail: /images/thumbnails/angular.png
---

Accessors, also known as getters/setters, provide a way of intercepting access to object properties. They are supported in [Javascript][js_accessors] and [Typescript][ts_accessors] via the `get` and `set` keywords.

<!--more-->

Labeling a function with `set` will allow it to be used via the `=` operator. The value to the right hand side of the operator will be passed into the custom `set` function. Labeling a function as `get` will allow it to be accessed as if it were a property.

```typescript
class Person {
  private _age = new BehaviorSubject<number>(0);

  get age(): number {
    return this._age.value;
  }

  set age(age: number) {
    this._age.next(age);
  }

  get isOver18(): boolean {
    // uses the get age accessor internally
    return this.age >= 18;
  }
}

const p = new Person();
p.age = 25; // 25 is passed to the set age accessor
console.log(p.isOver18); // true
```

## Usage in Angular

[It is common in Angular to use a service to provide a shared state amongst components][common_usage]. These services often provide a `BehaviorSubject` via [rxjs][behavior]. This `BehaviorSubject` is then subscribed to by components using the `ngOnInit` life cycle hook. The example below displays this common pattern.

```typescript
@Injectable()
export class UserService {
  loggedInUser = new BehaviorSubject<string>('');
}
```

```typescript
@Component({
  selector: "greet",
  template: "Hello {{name}}!",
  providers: [UserService]
})
class GreetComponent implements OnInit {
  @Input() name: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loggedInUser.next(this.name);
    this.userService.loggedInUser.subscribe(name => {
      this.name = name;
    });
  }
}
```

The above code achieves what it set's out to do. However note the subscription to the `BehaviorSubject`. This will need to be unsubscribed from when the component is destroyed, [to avoid memory leaks][destroy]. In order to do this we must write more code. The recommended strategy for this is to use the rxjs [`takeUntil`][take_until] function. Using this strategy the component's code is now the following.

```typescript
@Component({
  selector: "greet",
  template: "Hello {{name}}!",
  providers: [UserService]
})
class GreetComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject<any>();
  
  @Input() name: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.loggedInUser.next(this.name);
    this.userService.loggedInUser
      .takeUntil(this.componentDestroyed)
      .subscribe(name => {
        this.name = name;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
```

As you can see from the example the code has now become quite verbose. There is also a lot of complexity in this code.

Property accessors can be used to remedy this. In the below example property accessors are used to remove the need to subscribe to the observable provided via the service. This makes the code more readable and concise. It removes the possibility of a memory leak caused by an unhandled subscription. And it removes the need to use angular life cycle hooks with in the component.

```typescript
@Component({
  selector: "greet",
  template: "Hello {{name}}!",
  providers: [UserService]
})
class GreetComponent {
  @Input()
  set name(value: string) {
    this.userService.loggedInUser.next(value);
  }

  get name(): string {
    return this.userService.loggedInUser.value;
  }

  constructor(private userService: UserService) {}
}
```

[js_accessors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
[ts_accessors]: https://www.typescriptlang.org/docs/handbook/classes.html#accessors
[common_usage]: https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#Unrelated-Components-Sharing-Data-with-a-Service
[behavior]: http://reactivex.io/rxjs/class/es6/BehaviorSubject.js~BehaviorSubject.html
[destroy]: https://angular.io/guide/lifecycle-hooks
[take_until]: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil