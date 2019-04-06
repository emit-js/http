# @emit-js/http

[emit](https://github.com/emit-js/emit#readme) universal http fetch

![http](http.gif)

## Install

```bash
npm install @emit-js/emit @emit-js/http
```

## Universal

This library works both server and client side.

## Setup

```js
const emit = require("@emit-js/emit")()
require("@emit-js/http")(emit)
```

## Usage

```js
const url = "https://jsonplaceholder.typicode.com/todos/1"

const body = await emit.http({ url })

const { body, ok, status } = await emit.http({
  full: true,
  url,
})
```

## Options

| Option | Description                                                     |
| ------ | --------------------------------------------------------------- |
| store  | Save response body to [store](https://github.com/emit-js/store) |
| text   | Return text (don't JSON parse)                                  |
| url    | Request URL                                                     |

## Credit

This library uses [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) under the hood.
