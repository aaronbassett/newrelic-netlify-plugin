const settings = (inputs) => {
  const IS_PREVIEW = process.env.CONTEXT == "deploy-preview"
  const FAIL_BUILD_ON_PLUGIN_ERROR =
    process.env.FAIL_BUILD_ON_PLUGIN_ERROR || inputs.failBuildOnPluginError

  const NEWRELIC_ACCOUNT_ID =
    process.env.NEWRELIC_ACCOUNT_ID || inputs.newrelicAccountId
  const NEWRELIC_INGEST_LICENSE_KEY =
    process.env.NEWRELIC_INGEST_LICENSE_KEY || inputs.newrelicLicenseKey

  const NEWRELIC_APP_ID = process.env.NEWRELIC_APP_ID || inputs.newrelicAppId
  const NEWRELIC_API_KEY = process.env.NEWRELIC_API_KEY || inputs.newrelicApiKey
  const SET_DEPLOYMENT_MARKERS =
    process.env.SET_DEPLOYMENT_MARKERS || inputs.setDeploymentMarkers
  const SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS =
    process.env.SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS ||
    inputs.setDeploymentMarkersForPreviews
  const RECORD_EVENTS_FOR_PREVIEWS =
    process.env.RECORD_EVENTS_FOR_PREVIEWS || inputs.recordEventsForPreviews
  const SKIP_PRE_BUILD_EVENT =
    process.env.SKIP_PRE_BUILD_EVENT || inputs.skipEvent?.onPreBuild
  const SKIP_BUILD_EVENT =
    process.env.SKIP_BUILD_EVENT || inputs.skipEvent?.onBuild
  const SKIP_POST_BUILD_EVENT =
    process.env.SKIP_POST_BUILD_EVENT || inputs.skipEvent?.onPostBuild
  const SKIP_ERROR_EVENT =
    process.env.SKIP_ERROR_EVENT || inputs.skipEvent?.onError
  const SKIP_SUCCESS_EVENT =
    process.env.SKIP_SUCCESS_EVENT || inputs.skipEvent?.onSuccess
  const SKIP_END_EVENT = process.env.SKIP_END_EVENT || inputs.skipEvent?.onEnd

  return {
    IS_PREVIEW,
    FAIL_BUILD_ON_PLUGIN_ERROR,
    NEWRELIC_ACCOUNT_ID,
    NEWRELIC_INGEST_LICENSE_KEY,
    NEWRELIC_APP_ID,
    NEWRELIC_API_KEY,
    SET_DEPLOYMENT_MARKERS,
    SET_DEPLOYMENT_MARKERS_FOR_PREVIEWS,
    RECORD_EVENTS_FOR_PREVIEWS,
    SKIP_PRE_BUILD_EVENT,
    SKIP_BUILD_EVENT,
    SKIP_POST_BUILD_EVENT,
    SKIP_ERROR_EVENT,
    SKIP_SUCCESS_EVENT,
    SKIP_END_EVENT,
  }
}

const getErrorResponse = (inputs, build) => {
  const { FAIL_BUILD_ON_PLUGIN_ERROR } = settings(inputs)
  return FAIL_BUILD_ON_PLUGIN_ERROR ? build.failBuild : build.failPlugin
}

module.exports = { settings, getErrorResponse }
