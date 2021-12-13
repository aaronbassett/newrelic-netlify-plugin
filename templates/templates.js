const fs = require("fs")
const path = require("path")

const getTemplateString = (templateFileName) => {
  const TEMPLATE_FILE_PATH = path.resolve(__dirname, templateFileName)
  console.log("TEMPLATE_FILE_PATH", TEMPLATE_FILE_PATH)

  const buffer = fs.readFileSync(TEMPLATE_FILE_PATH)

  return buffer.toString()
}

const changeLogTemplate = getTemplateString("changeLogTemplate.txt")
const deploySummaryTemplate = getTemplateString("deploySummary.txt")

module.exports = { changeLogTemplate, deploySummaryTemplate }
