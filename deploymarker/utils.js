module.exports.skipMarker = (
  { IS_PREVIEW, SET_DEPLOYMENT_MARKERS, SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS },
  git
) => {
  if (!SET_DEPLOYMENT_MARKERS) return true
  if (IS_PREVIEW && !SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS) {
    console.log("Skipping New Relic deployment marker. Deploy preview.")
    return true
  }
  if (git.commits[0].sha == "") {
    // TODO: Fix this.
    console.warn(
      "Skipping New Relic deployment marker. Has this version been deployed before?"
    )
    return true
  }

  return false
}

module.exports.missingSettings = (
  { NEWRELIC_APP_ID, NEWRELIC_API_KEY },
  errorResponse
) => {
  if (!NEWRELIC_APP_ID) {
    return errorResponse(
      `Deployment markers are enabled, but NEWRELIC_APP_ID is not set`
    )
  }
  if (!NEWRELIC_API_KEY) {
    return errorResponse(
      `Deployment markers are enabled, but NEWRELIC_API_KEY is not set`
    )
  }
  return false
}
