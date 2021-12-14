const { settings, getErrorResponse } = require("../settings")
const { skipBrowserMonitoring, missingSettings } = require("./utils")
const { insertBrowserMonitoring } = require("./htmlInsertion")

module.exports.injectBrowserMonitoring = async ({
  inputs,
  utils,
  constants,
}) => {
  const { build } = utils
  const errorResponse = getErrorResponse(inputs, build)

  return (
    skipBrowserMonitoring(settings(inputs)) ||
    missingSettings(settings(inputs), errorResponse) ||
    (await insertBrowserMonitoring(constants, inputs))
  )
}
