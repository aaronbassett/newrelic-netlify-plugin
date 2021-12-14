# New Relic Netlify Plugin

[![npm version](https://badge.fury.io/js/@aaronbassett%2Fnewrelic-netlify-plugin.svg)](https://www.npmjs.com/package/@aaronbassett/newrelic-netlify-plugin) [![GitHub issues](https://img.shields.io/github/issues/aaronbassett/newrelic-netlify-plugin)](https://github.com/aaronbassett/newrelic-netlify-plugin/issues) [![License](https://img.shields.io/github/license/aaronbassett/newrelic-netlify-plugin)](https://github.com/aaronbassett/newrelic-netlify-plugin/blob/fb2291049e67413815056fb429d8d48b6310d2fd/LICENSE) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@aaronbassett/newrelic-netlify-plugin)](https://www.npmjs.com/package/@aaronbassett/newrelic-netlify-plugin?activeTab=dependencies) [![Lines of code](https://img.shields.io/tokei/lines/github/aaronbassett/newrelic-netlify-plugin)](https://github.com/aaronbassett/newrelic-netlify-plugin) [![npm download stats](https://img.shields.io/npm/dw/@aaronbassett/newrelic-netlify-plugin)](https://www.npmjs.com/package/@aaronbassett/newrelic-netlify-plugin)

---

Automatically track your builds, mark your deployments, and install the browser agent with this New Relic Netlify Plugin.

## Features

- Custom events for `onPreBuild`, `onBuild`, `onPostBuild`, `onSuccess`, `onError`, and `onEnd`
- Create [Deployment Markers](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/record-monitor-deployments/) after each build
- Add the [New Relic browser monitor](https://docs.newrelic.com/docs/browser/browser-monitoring/getting-started/introduction-browser-monitoring/) to all your static HTML pages
- Highly customizable!

## Installation

Use [file-based installation](https://docs.netlify.com/configure-builds/build-plugins/#file-based-installation) to install the plugin by modifying your `netlify.toml`

```toml
[[plugins]]
package = "@aaronbassett/newrelic-netlify-plugin"
```

## Configuration

You can control much of the plugin's settings via [environment variables](https://docs.netlify.com/configure-builds/environment-variables/) or in your `netlify.toml`.

```toml
[[plugins]]
package = "@aaronbassett/newrelic-netlify-plugin"

  [plugins.inputs]
    failBuildOnPluginError = false
    newrelicAccountId = "123456"
    newrelicLicenseKey = "12345678901234567890"
    newrelicAppId = "123456789"
    newrelicApiKey = "1234567890QWERTYUIOP"
    newrelicBrowserLicenseKey = "POIU-0987654321"
    enableBrowserMonitoring = true

  [plugins.inputs.skipEvent]
    onPreBuild = false
    onBuild = false
    onPostBuild = false
    onEnd = false
```

| Name                               | Description                                                                   | Default Value |
| ---------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| failBuildOnPluginError             | Fail the whole build if the plugin has an error                               | true          |
| newrelicAccountId                  | New Relic Account ID (required for event tracking & browser monitoring)       | undefined     |
| newrelicLicenseKey                 | New Relic Ingest License Key (required for event tracking)                    | undefined     |
| newrelicBrowserLicenseKey          | New Relic Ingest License Key (required for event tracking)                    | undefined     |
| newrelicAppId                      | New Relic APM App ID (required for deployment marking & browser monitoring)   | undefined     |
| newrelicApiKey                     | New Relic User Key (required for deployment marking)                          | undefined     |
| setDeploymentMarkers               | Set this to to false to disable deployment marker creation                    | true          |
| setDeploymentMarkersForPreviews    | Set this to true if you want to create deployment markers for deploy previews | false         |
| recordEventsForPreviews            | Set this to true if you want to record events for deploy previews             | false         |
| skipEvent.onPreBuild               | Set this to true to skip recording onPreBuild custom events                   | false         |
| skipEvent.onBuild                  | Set this to true to skip recording onBuild custom events                      | false         |
| skipEvent.onPostBuild              | Set this to true to skip recording onPostBuild custom events                  | false         |
| skipEvent.onSuccess                | Set this to true to skip recording onSuccess custom events                    | false         |
| skipEvent.onError                  | Set this to true to skip recording onError custom events                      | false         |
| skipEvent.onEnd                    | Set this to true to skip recording onEnd custom events                        | false         |
| enableBrowserMonitoring            | Attempt to inject the browser monitor script tag into any HTML pages          | false         |
| enableBrowserMonitoringForPreviews | Set this to true if you want to enable browser monitoring for deploy previews | false         |
| distributedTracingEnabled          | Enable distributed tracing for browser requests                               | true          |
| cookiesEnabled                     | Enable cookies for browser monitoring                                         | true          |
| deployMarkerRevisionTemplate       | eploy marker UUID structure (EJS string)                                      | true          |
