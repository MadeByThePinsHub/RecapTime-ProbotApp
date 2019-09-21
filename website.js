// In this code uses Express and Node-CMD packages to auto-update your Glitch project
// with either GitHub, GitLab or both of them.
// See https://support.glitch.com/t/tutorial-how-to-auto-update-your-project-with-github/8124 for
// detailed help.

const cmd = require("node-cmd");
const express =  require("express");
const crypto = require("crypto"); // NPM Package "crypto" is pre-installed, so forget about digging search results again.
const app = express();
const { registerAuthRoutes } = require('auth-routes')
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://ad497bb2151544dea839c616bc37c0e8@sentry.io/1756966' }); // Change it with your own DSN

app.post('/git', (req, res) => {
  let hmac = crypto.createHmac("sha1", process.env.GitHub_webhookSecret);
  let sig  = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  
  if (req.headers['x-github-event'] == "push") {
      cmd.run('chmod 777 github.sh'); /* :/ Fix no perms after updating */
      cmd.get('./deploy/github.sh', (err, data) => {  // Run our script
        if (data) console.log(data);
        if (err) console.log(err);
    });
  cmd.run('refresh');  // Refresh project
  let commits = req.body.head_commit.message.split("\n").length == 1 ?
              req.body.head_commit.message :
              req.body.head_commit.message.split("\n").map((el, i) => i !== 0 ? "                       " + el : el).join("\n");
  console.log(`> [GIT] Source code updated with github:MadeByThePinsHub/RecapTime-ProbotApp/master\n` + 
            `        Latest commit: ${commits}`);
  }
  return res.sendStatus(200).json({ status: 200, description: 'GitHub webhook message received, waiting for Glitch to update source code...'}); // Send back OK status
})

app.get('/git', (req, res) => {
  cmd.run('chmod 777 github.sh'); /* :/ Fix no perms after updating */
  cmd.get('./deploy/github.sh', (err, data) => {  // Run our script
    if (data) console.log(data);
    if (err) console.log(err);
    });
  cmd.run('refresh');  // Refresh project
  let commits = req.body.head_commit.message.split("\n").length == 1 ?
              req.body.head_commit.message :
              req.body.head_commit.message.split("\n").map((el, i) => i !== 0 ? "                       " + el : el).join("\n");
  console.log(`> [GIT] Source code updated with github:MadeByThePinsHub/RecapTime-ProbotApp/master\n` + 
            `        Latest commit: ${commits}`);
  return res.sendStatus(200).json({ status: 200, description: 'We received your GET request, waiting for Glitch to update source code...'}); // Send back OK status
})

///
///
///

module.exports = app => {
  // Access the Express server that Probot uses
  const expressApp = app.route()
 
  // Register the routes as normal
  registerAuthRoutes(expressApp, {
    loginURL: '/connectApp',
    callbackURL: '/connectApp/success',
    afterLogin: '/thankyou',
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET
  })
}

myUndefinedFunction();