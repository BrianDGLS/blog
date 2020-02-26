---
title: "Http to Https Redirect in Node"
date:   "2017-04-04"
tags: [ "node", "express" ]
categories:
    - node
slug: "http-to-https-redirect-node"
thumbnail: /images/thumbnails/nodejs.png
---

Node comes with https support out of the box.
This article will explain how to redirect your http traffic to https.
[Express 4](https://expressjs.com/en/api.html) will be used to demo this.
The code examples will be written in [Typescript](https://www.typescriptlang.org/).

<!--more-->

## Setting up a HttpRedirect class

We will create a seperate express instance to handle the http to https redirect.
This new instance will use a http server and redirect all of it's incoming traffic 
to the sites equivalent https route.

In the example below we instantiate a new express instance and pass it to a http server.
We then set up a route guard that will check all incoming requests and redirect those that 
are http to the equivalent https route.

```typescript
// ./HttpRedirect.ts
// import server from the http module
import { Server, createServer } from 'http'
import * as express from 'express'

export class HttpRedirect {
  private app: express.Application
  private server: Server

  constructor() {
    // initialize the new express instance
    this.app = express()
    // pass this express instance to the http server
    this.server = createServer(this.app)

    // instantiate routes
    this.routes()
  }

  private routes(): void {
    // tell the express instance to run this callback for each request
    this.app.use((req, res, next) =>
      // check if it is a secure (https) request
      // if not redirect to the equivalent https url
      !req.secure ? res.redirect('https://' + req.hostname + req.url) : next()
    )
  }

  public listen(port: number): void {
    // tell express instance to listen on given port
    this.server.listen(port)
  }
}
```

## Using the HttpRedirect class

Now that we have set up the `HttpRedirect` class in the above section we can look at 
using it in the context of an express application.

As our http redirect will run as a seperate http server we must start that server along with 
our main application's server.
To do this we will instantiate our `HttpRedirect` class inside the main express instance's `listen` callback.
Once this is done we will have two seperate server instances running, one on http the other on https.
The http instance will redirect to the https instance.
An example of this can be found below.

```typescript
// ./Server.ts
import { join } from 'path'
import { readFileSync } from 'fs'
// import server from https module
import { Server as HttpsServer, createServer } from 'https'

import * as express from 'express'

// import out HttpRedirect class
import { HttpRedirect } from './httpRedirect'

export class Server {
  private SECURE_PORT: number = 443
  private REDIRECT_PORT: number = 80

  private app: express.Application = express()

  // get out ssl credentials for the https server
  private ssl: { key: string, cert: string } = {
    key: readFileSync(join(__dirname, 'certs/server.key'), 'utf8'),
    cert: readFileSync(join(__dirname, 'certs/server.crt'), 'utf8')
  }

  private server: HttpsServer = createServer(this.ssl, this.app)

  private listen(): void {
    // start main https server
    this.server.listen(this.SECURE_PORT, () => {
      console.log(`Server started on changed PORT:${this.SECURE_PORT}`)

      // instantiate `HttpRedirect` and start it's server on the given port
      new HttpRedirect().listen(this.REDIRECT_PORT)
    })
  }

  public start(): void {
    this.app.get('/', (req, res) => res.send('hello world'))

    this.listen()
  }
}
```

We have now set up a http to https redirect.
The `HttpRedirect` class used above is very useful and a handy recipe to have as a Node developer.