/* eslint-env jest */

var emit,
  http = require("./"),
  log = require("@emit-js/log"),
  store = require("@emit-js/store")

var url = "https://jsonplaceholder.typicode.com/todos/1"

beforeEach(function() {
  emit = require("@emit-js/emit")()
  http(emit)
  log(emit)
})

test("http", function() {
  return emit
    .http({
      json: true,
      url: url,
    })
    .then(function(out) {
      expect(out.body).toEqual(expect.any(Object))
      expect(out.ok).toBe(true)
      expect(out.status).toBe(200)
      expect(out.url).toBe(url)
    })
})

test("http and store", function() {
  expect.assertions(1)

  store(emit)

  return emit
    .http("todos", {
      json: true,
      store: true,
      url: url,
    })
    .then(function() {
      expect(emit.get("todos")).toEqual(expect.any(Object))
    })
})

test("http error", function() {
  expect.assertions(1)

  return emit
    .http("todos", {
      json: true,
      store: true,
      url: "http://does-no-exist",
    })
    .catch(function() {
      expect(true).toBe(true)
    })
})
