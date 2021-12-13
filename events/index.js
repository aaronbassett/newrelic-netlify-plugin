const { recordEvent } = require("./record")
const { onPreBuild } = require("./prebuild")
const { onBuild } = require("./build")
const { onPostBuild } = require("./postbuild")
const { onSuccess } = require("./success")
const { onError } = require("./error")
const { onEnd } = require("./end")

module.exports = {
  recordEvent,
  onPreBuild,
  onBuild,
  onPostBuild,
  onSuccess,
  onError,
  onEnd,
}
