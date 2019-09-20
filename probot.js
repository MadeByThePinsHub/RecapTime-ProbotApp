const getConfig = require('probot-config')
const mongoose = require('mongoose')
const commands = require('probot-commands')
const createScheduler = require('probot-scheduler')
const RT_Stale = require('./lib/stale')
const cmd = require("node-cmd");
const express =  require("express");
const crypto = require("crypto"); // NPM Package "crypto" is pre-installed, so forget about digging search results again.
const app = express()

// The first code was derivied from probot-stale plugin
module.exports = async app => {
  // Visit all repositories to mark and sweep stale issues
  const scheduler = createScheduler(app)

  // Unmark stale issues if a user comments
  const events = [
    'issue_comment',
    'issues',
    'pull_request',
    'pull_request_review',
    'pull_request_review_comment'
  ]

  app.on(events, unmark)
  app.on('schedule.repository', markAndSweep)

  async function unmark (context) {
    if (!context.isBot) {
      const recaptime_plugins_stale = await forRepository(context)
      let issue = context.payload.issue || context.payload.pull_request
      const type = context.payload.issue ? 'issues' : 'pulls'

      // Some payloads don't include labels
      if (!issue.labels) {
        try {
          issue = (await context.github.issues.get(context.issue())).data
        } catch (error) {
          context.log('Issue not found')
        }
      }

      const staleLabelAdded = context.payload.action === 'labeled' &&
        context.payload.label.name === recaptime_plugins_stale.config.staleLabel

      if (recaptime_plugins_stale.hasStaleLabel(type, issue) && issue.state !== 'closed' && !staleLabelAdded) {
        recaptime_plugins_stale.unmarkIssue(type, issue)
      }
    }
  }

  async function markAndSweep (context) {
    const stale = await forRepository(context)
    await stale.markAndSweep('pulls')
    await stale.markAndSweep('issues')
  }

  async function forRepository (context) {
    let config = await getConfig(context, 'recaptime_config.yml')

    if (!config) {
      scheduler.stop(context.payload.repository)
      // Don't actually perform for repository without a config
      config = { perform: false }
      print('Something fishy on some repositories: No configuration files.')
    }

    config = Object.assign(config, context.repo({ logger: app.log }))

    return new RT_Stale(context.github, config)
  }
}

module.exports = (app) => {
  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    const automated_text = context.issue({owner: 'MadeByThePinsDevs', repo: 'RecapTime-ProbotApp', body: ''})
    return context.github.issues.createComment(automated_text)
  })
}

module.exports = robot => {
  // Type `/label foo, bar` in a comment box for an Issue or Pull Request
  commands(robot, 'addlabel', (context, command) => {
    const labels = command.arguments.split(/, */);
    return context.github.issues.addLabels(context.issue({labels}));
  });
  commands(robot, 'help', (context, command) => {
    const botcommands_help = context.issue({body: ''})
    return context.github.issues.createComment(botcommands_help)
  })
}

// Combined from git-deploys.js file
app.post('/webhooks/github', (req, res) => {
  let hmac = crypto.createHmac("sha1", process.env.GitHub_webhookSecret);
  let sig  = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  
  if (req.headers['x-github-event'] == "push") {
      cmd.run('chmod 777 github.sh'); /* :/ Fix no perms after updating */
      cmd.get('./deploy/github.sh', (err, data) => {  // Run our script
        if (data)
          console.log(data);
        if (err)
          console.log(err);
    });
  cmd.run('refresh');  // Refresh project
  let commits = req.body.head_commit.message.split("\n").length == 1 ?
              req.body.head_commit.message :
              req.body.head_commit.message.split("\n").map((el, i) => i !== 0 ? "                       " + el : el).join("\n");
  console.log(`> [GIT] Source code updated with github:MadeByThePinsHub/RecapTime-ProbotApp\n` + 
            `        Latest commit: ${commits}`);
  }
  return res.sendStatus(200).json({ status: 'Success', description: 'The server received the webhooj message. Updating Glitch repo...' }); // Send back OK status
})

