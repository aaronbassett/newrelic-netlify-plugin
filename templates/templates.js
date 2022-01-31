import fs from "fs"
import path from "path"

const getTemplateString = (templateFileName) => {
  const TEMPLATE_FILE_PATH = path.resolve(__dirname, templateFileName)
  const buffer = fs.readFileSync(TEMPLATE_FILE_PATH)
  return buffer.toString()
}

const changeLogTemplate = getTemplateString("changeLogTemplate.txt")
const deploySummaryTemplate = getTemplateString("deploySummary.txt")
const browserAgentTemplate = getTemplateString("browserAgent.txt")

export { changeLogTemplate, deploySummaryTemplate, browserAgentTemplate }
