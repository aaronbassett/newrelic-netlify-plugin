const { settings, getErrorResponse } = require("../settings")
const { recordEvent } = require("./record")
const { setDeployMarker } = require("../deploymarker/set")

module.exports.onPostBuild = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build } = utils

  const { SKIP_POST_BUILD_EVENT } = settings(inputs)

  const errorResponse = getErrorResponse(inputs, build)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_POST_BUILD_EVENT,
      eventName: "onPostBuild",
      settings: settings(inputs),
      constants,
      errorResponse,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }

    await setDeployMarker(pluginApi)
  }
}
