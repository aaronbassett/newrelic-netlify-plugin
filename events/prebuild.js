const { settings, getErrorResponse } = require("../settings")
const { recordEvent } = require("./record")

module.exports.onPreBuild = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build } = utils

  const { SKIP_PRE_BUILD_EVENT } = settings(inputs)

  const errorResponse = getErrorResponse(inputs, build)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_PRE_BUILD_EVENT,
      eventName: "onPreBuild",
      settings: settings(inputs),
      constants,
      errorResponse,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }
  }
}
