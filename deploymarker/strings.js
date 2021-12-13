const ejs = require("ejs")
const { changeLogTemplate } = require("../templates")

const revision = (git) => {
  return `${process.env.CONTEXT.toUpperCase()}:${git.commits[0].sha}`
}

const changelog = (git) => {
  return ejs
    .render(changeLogTemplate, { git: git, env: process.env })
    .replace(/\n{3,}/g, "\n\n")
}

const description = (git, constants) => {
  return `Deploying "${git.commits[0].message}" from branch ${
    process.env.BRANCH
  } to ${process.env.CONTEXT.toUpperCase()} for site ${
    process.env.SITE_NAME
  } on Netlify v${constants.NETLIFY_BUILD_VERSION}`
}

module.exports = { revision, changelog, description }
