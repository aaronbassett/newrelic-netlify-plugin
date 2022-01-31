const fs = require("fs")
const path = require("path")
const ejs = require("ejs")
const glob = require("glob")
const pMap = require("p-map")
const { settings } = require("../settings")
const { browserAgentTemplate } = require("../templates")
const { expressions } = require("./expressions")
const { deploySummaryResults } = require("../results")

/* HTML Insertion code ported from the New Relic Python Agent
  https://github.com/newrelic/newrelic-python-agent/blob/cb766940119ac5b8bf3b6175dede551d51e38e35/newrelic/api/html_insertion.py */

const endIndexOfMatch = (match) => {
  return match ? match.index + match[0].length : 0
}

const insertHtmlSnippet = (html, htmlToBeInserted) => {
  /* First determine if we have a body tag. If we don't we
  always give up even though strictly speaking we may not
  actually need it to exist. This is to ensure that we have
  all the HTML needed to perform the match correctly. */
  if (!expressions.body.test(html)) {
    return html
  }

  /* Search for instance of a content disposition meta tag
  indicating that the response is actually being served up
  as an attachment and would be saved as a file and not
  actually interpreted by a browser. */
  if (expressions.meta.attachment.test(html)) {
    return html
  }

  /* Search for instances of X-UA or charset meta tags. We will
  use whichever is the last to appear in the data. */
  const metaXuaLastMatch = [...html.matchAll(expressions.meta.xua)].pop()
  const metaCharsetLastMatch = [
    ...html.matchAll(expressions.meta.charset),
  ].pop()

  let insertionIndex = Math.max(
    endIndexOfMatch(metaXuaLastMatch),
    endIndexOfMatch(metaCharsetLastMatch)
  )

  // Next try for the start of head section.
  if (!insertionIndex) {
    const headFirstMatch = html.match(expressions.head)
    insertionIndex = endIndexOfMatch(headFirstMatch)
  }

  // Finally if no joy, insert before the start of the body.
  if (!insertionIndex) {
    const bodyFirstMatch = html.match(expressions.body)
    insertionIndex = bodyFirstMatch?.index || 0
  }

  return `${html.slice(0, insertionIndex)}${htmlToBeInserted}${html.slice(
    insertionIndex
  )}`
}

const browserAgentScriptTag = (browserAgentSettings) => {
  return ejs.render(browserAgentTemplate, { browserAgentSettings })
}

const insertBrowserAgent = async (file) => {
  const html = await fs.readFile(file.path).toString()
  const updatedHtml = insertHtmlSnippet(html, file.htmlToBeInserted)

  if (html != updatedHtml) {
    await fs.writeFile(file.path, updatedHtml)
    deploySummaryResults.addInjectedHtmlFile(file.path)
  } else {
    deploySummaryResults.addCouldNotInjectHtmlFile(file.path)
  }
}

module.exports.insertBrowserMonitoring = async (constants, inputs) => {
  const {
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_APP_ID,
    NEWRELIC_BROWSER_LICENSE_KEY,
    DISTRIBUTED_TRACING_ENABLED,
    COOKIES_ENABLED,
  } = settings(inputs)

  const htmlToBeInserted = browserAgentScriptTag({
    DISTRIBUTED_TRACING_ENABLED,
    COOKIES_ENABLED,
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_APP_ID,
    NEWRELIC_BROWSER_LICENSE_KEY,
  })

  const htmlFiles = await glob
    .sync("**/*.html", { cwd: constants.PUBLISH_DIR })
    .map((file) => {
      return {
        path: path.resolve(constants.PUBLISH_DIR, file),
        htmlToBeInserted,
      }
    })

  const result = await pMap(htmlFiles, insertBrowserAgent, { concurrency: 2 })

  console.log(result)
}
