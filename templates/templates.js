const fs = require("fs")
const path = require("path")

const getTemplateString = (templateFileName) => {
  const CWD = path.resolve(process.cwd())
  const TEMPLATE_PATH = path.resolve(
    CWD,
    "plugins/newrelic-netlify-build-plugin/templates"
  )
  const TEMPLATE_FILE_PATH = path.resolve(TEMPLATE_PATH, templateFileName)

  const buffer = fs.readFileSync(TEMPLATE_FILE_PATH)

  return buffer.toString()
}

const changeLogTemplate = getTemplateString("changeLogTemplate.txt")
const deploySummaryTemplate = getTemplateString("deploySummary.txt")

module.exports = { changeLogTemplate, deploySummaryTemplate }
