const getConfig = require('probot-config')
const mongoose = require('mongoose')

const mongoUri = `mongodb://${process.env.DB_HOST}`

mongoose.connect(mongoUri, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useMongoClient: true
})

module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')
  app.on('push', async context => {
    // Will look for 'test.yml' inside the '.github' folder
    const config = await getConfig(context, 'stale.yml', '')
    context.log(config, 'Loaded config')
  })
  // example of probot responding 'Hello World' to a new issue being opened
  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({body: 'Thank you for installing Recap Time Probot App!' + '\n' + '\n' +
                                 'To configure the app, see [https://supportcentral-madebythepins.freshdesk.com/solutions]'})

    // Post a comment on the issue
    return context.github.issues.createComment(params)
  })
}
