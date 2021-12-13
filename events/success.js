const { settings } = require("../settings")
const { recordEvent } = require("./record")

module.exports.onSuccess = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build } = utils

  const { SKIP_SUCCESS_EVENT } = settings(inputs)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_SUCCESS_EVENT,
      eventName: "onSuccess",
      errorResponse: build.failPlugin, // We can't fail build after it has succeeded
      settings: settings(inputs),
      constants,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }
  }
}
