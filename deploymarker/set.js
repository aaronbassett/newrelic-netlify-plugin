const { skipMarker, missingSettings } = require("./utils")
const { makeRequest } = require("./post")
const { getErrorResponse, settings } = require("../settings")

module.exports.setDeployMarker = async (pluginApi) => {
  const { inputs, utils } = pluginApi
  const { build, git } = utils

  const errorResponse = getErrorResponse(inputs, build)

  return (
    skipMarker(settings(inputs), git) ||
    missingSettings(settings(inputs), errorResponse) ||
    (await makeRequest(pluginApi))
  )
}
