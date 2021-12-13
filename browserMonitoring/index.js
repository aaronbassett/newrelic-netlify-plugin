const ejs = require("ejs")
const { settings, getErrorResponse } = require("../settings")
const { browserAgentTemplate } = require("../templates")

const browserAgentScriptTag = (browserAgentSettings) => {
  return ejs.render(browserAgentTemplate, { browserAgentSettings })
}

module.exports.injectBrowserMonitoring = ({ inputs, utils }) => {
  const { build } = utils

  const {
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_APP_ID,
    NEWRELIC_BROWSER_LICENSE_KEY,
    ENABLE_BROWSER_MONITORING,
    DISTRIBUTED_TRACING_ENABLED,
    COOKIES_ENABLED,
  } = settings(inputs)

  const errorResponse = getErrorResponse(inputs, build)

  if (
    ENABLE_BROWSER_MONITORING &&
    (!NEWRELIC_ACCOUNT_ID || !NEWRELIC_APP_ID || !NEWRELIC_BROWSER_LICENSE_KEY)
  ) {
    return errorResponse(
      `Browser monitoring is enabled, but NEWRELIC_APP_ID, NEWRELIC_ACCOUNT_ID, or NEWRELIC_BROWSER_LICENSE_KEY is not set`
    )
  }

  const browserAgentSettings = {
    DISTRIBUTED_TRACING_ENABLED,
    COOKIES_ENABLED,
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_APP_ID,
    NEWRELIC_BROWSER_LICENSE_KEY,
  }
  console.log("###### BROWSER AGENT SCRIPT TAG")
  console.log(browserAgentScriptTag(browserAgentSettings))
  console.log("")
  console.log("")
  console.log("")

  return
}
