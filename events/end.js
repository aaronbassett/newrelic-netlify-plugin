const { settings } = require("../settings")
const { recordEvent } = require("./record")

const { deploySummaryResults } = require("../results")

module.exports.onEnd = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build, status } = utils

  const { SKIP_END_EVENT } = settings(inputs)

  if (!constants.IS_LOCAL) {
    const eventRecordingResponse = await recordEvent({
      isEnabled: !SKIP_END_EVENT,
      eventName: "onEnd",
      errorResponse: build.failPlugin, // We can't fail build after everything has ended
      settings: settings(inputs),
      constants,
    })

    if (eventRecordingResponse) {
      return eventRecordingResponse
    }

    status.show(deploySummaryResults.show())
  }
}
