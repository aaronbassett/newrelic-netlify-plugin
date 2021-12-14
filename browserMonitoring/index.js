const fs = require("fs")
const path = require("path")
const ejs = require("ejs")
const glob = require("glob")
const { settings, getErrorResponse } = require("../settings")
const { browserAgentTemplate } = require("../templates")
const { insertHtmlSnippet } = require("./htmlInsertion")

const browserAgentScriptTag = (browserAgentSettings) => {
  return ejs.render(browserAgentTemplate, { browserAgentSettings })
}

module.exports.injectBrowserMonitoring = async ({
  inputs,
  utils,
  constants,
}) => {
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

  const htmlToBeInserted = browserAgentScriptTag(browserAgentSettings)
  await glob.sync("**/*.html", { cwd: constants.PUBLISH_DIR }).map((file) => {
    const htmlFilePath = path.resolve(constants.PUBLISH_DIR, file)
    const html = fs.readFileSync(htmlFilePath).toString()
    const updatedHtml = insertHtmlSnippet(html, htmlToBeInserted)
    fs.writeFileSync(htmlFilePath, updatedHtml)
  })
}
