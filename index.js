const {
  onPreBuild,
  onBuild,
  onPostBuild,
  onSuccess,
  onError,
  onEnd,
} = require("./events")

module.exports = {
  onPreBuild: onPreBuild,
  onBuild: onBuild,
  onPostBuild: onPostBuild,
  onSuccess: onSuccess,
  onError: onError,
  onEnd: onEnd,
}
