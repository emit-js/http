var unfetch = require("isomorphic-unfetch")

module.exports = function(dot, opts) {
  var state = dot.state

  if (state.fetch) {
    return
  }

  state.fetch = opts || {}

  dot.any("fetch", fetch)
}

function fetch(prop, arg, dot, e, sig) {
  var ok, status

  return unfetch(arg.url, arg)
    .then(function(r) {
      ok = r.ok
      status = r.status

      if (!ok) {
        throw new Error(
          "Request to " +
            arg.url +
            " failed, status code: " +
            r.status
        )
      } else if (arg.text) {
        return r.text()
      } else if (arg.json || arg.url.match(/\.json$/)) {
        return r.json()
      }
    })
    .then(function(body) {
      sig.value = {
        body: body,
        ok: ok,
        status: status,
        url: arg.url,
      }

      if (arg.store && dot.set) {
        return dot.set(prop, body)
      }
    })
    .catch(function(err) {
      if (dot.log) {
        dot.log("error", err.toString())
      }

      if (!arg.lax) {
        throw new Error(err)
      }
    })
}
