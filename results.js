const ejs = require("ejs")

class PluginResults {
  deploymentMarkerUUID = undefined
  eventsRecorded = []

  addRecordedEvent(event) {
    this.eventsRecorded.push(event)
  }

  setDeploymentMarkerUUID(uuid) {
    this.deploymentMarkerUUID = uuid
  }

  summary() {
    return !this.deploymentMarkerUUID && this.eventsRecorded.length == 0
      ? "Nothing to report"
      : `We ${
          this.deploymentMarkerUUID ? "marked a deployment and " : ""
        }recorded ${this.eventsRecorded.length} ${
          this.eventsRecorded.length == 1 ? "event" : "events"
        }`
  }

  text() {
    const { deploySummaryTemplate } = require("./templates")

    return ejs.render(deploySummaryTemplate, {
      deploymentMarkerUUID: this.deploymentMarkerUUID,
      eventsRecorded: this.eventsRecorded,
    })
  }

  show() {
    return {
      title: "New Relic build plugin results",
      summary: this.summary(),
      text: this.text(),
    }
  }
}

module.exports.deploySummaryResults = new PluginResults()
