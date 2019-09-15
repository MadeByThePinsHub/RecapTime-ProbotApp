const getConfig = require('probot-config')
const mongoose = require('mongoose')
const commands = require('probot-commands')

module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')
  app.on('push', async context => {
    // Will look for 'test.yml' inside the '.github' folder
    const config = await getConfig(context, 'recaptime_config.yml')
    context.log(config, 'Loaded config')
  })
  module.exports = robot => {
  // Type `/label foo, bar` in a comment box for an Issue or Pull Request
  commands(robot, 'addlabel', (context, command) => {
    const labels = command.arguments.split(/, */);
    return context.github.issues.addLabels(context.issue({labels}));
  });
  commands(robot, 'help', (context, command) => {
    const botcommands_help = context.issue({body: 'To see the full list of available commands for this bot, please go' +
                'to these links provided:' + '\n' + '\n' +
                '- [Bot Documentation on GitHub](https://recaptime-probotapp.github.io/docs)'})
    return context.github.issues.createComment(botcommands_help)
  })
  app.on('issues.opened', async context => {
    const params = context.issue({
      body: 'Hello World!'
    })
    await context.github.issues.createComment(params)
  })
}