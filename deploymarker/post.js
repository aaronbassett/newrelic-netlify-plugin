const axios = require("axios")

const { deploySummaryResults } = require("../results")
const { revision, changelog, description } = require("./strings")
const { settings, getErrorResponse } = require("../settings")

module.exports.makeRequest = async (pluginApi) => {
  const { constants, inputs, utils } = pluginApi
  const { build, git } = utils

  const { NEWRELIC_APP_ID, NEWRELIC_API_KEY } = settings(inputs)
  const errorResponse = getErrorResponse(inputs, build)

  try {
    const response = await axios({
      url: `https://api.newrelic.com/v2/applications/${NEWRELIC_APP_ID}/deployments.json`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": NEWRELIC_API_KEY,
      },
      data: {
        deployment: {
          revision: revision(git),
          changelog: changelog(git),
          description: description(git, constants),
          user: `${git.commits[0].committer.name}`,
          timestamp: new Date(
            Date.parse(git.commits[0].committer.date)
          ).toISOString(),
        },
      },
    })

    if (response.status == 201) {
      deploySummaryResults.setDeploymentMarkerUUID(revision(git))
      return
    } else {
      return errorResponse(
        `Could not create deployment marker "${revision(
          git
        )}" New Relic API responded with ${response.status} ${
          response.statusText
        }`
      )
    }
  } catch (error) {
    return errorResponse(
      `Could not create deployment marker "${revision(git)}"`,
      error
    )
  }
}
