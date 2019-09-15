const getConfig = require('probot-config')
const mongoose = require('mongoose')
const commands = require('probot-commands')
const createScheduler = require('probot-scheduler')

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