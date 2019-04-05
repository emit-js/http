var fetch = require("isomorphic-unfetch")

module.exports = function(emit) {
  if (emit.http) {
    return
  }

  emit.any("http", http)
}

function http(arg, prop, emit, sig) {
  var ok, status

  return fetch(arg.url, arg)
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
      } else {
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

      emit("log", "info", prop, sig.value)

      if (arg.store && emit.set) {
        return emit.set(prop, body)
      }
    })
    .catch(function(err) {
      emit("log", "error", prop, err.toString())

      if (!arg.lax) {
        throw new Error(err)
      }
    })
}
