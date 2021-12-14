const fs = require("fs")
const path = require("path")

const getTemplateString = (templateFileName) => {
  const TEMPLATE_FILE_PATH = path.resolve(__dirname, templateFileName)
  const buffer = fs.readFileSync(TEMPLATE_FILE_PATH)
  return buffer.toString()
}

const changeLogTemplate = getTemplateString("changeLogTemplate.txt")
const deploySummaryTemplate = getTemplateString("deploySummary.txt")
const browserAgentTemplate = getTemplateString("browserAgent.txt")

module.exports = {
  changeLogTemplate,
  deploySummaryTemplate,
  browserAgentTemplate,
}
