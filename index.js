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
  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({body: 'Thank you for installing Recap Time Probot App!' + '\n' + '\n' +
                                 'To configure the app, see [https://supportcentral-madebythepins.freshdesk.com/solutions]'})
    const parms = context.issue({owner: 'MadeByThePinsDevs', repo: '', body: ''})
    return context.github.issues.createComment(params)
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