// In this code uses Express and Node-CMD packages to auto-update your Glitch project
// with either GitHub, GitLab or both of them.
// See https://support.glitch.com/t/tutorial-how-to-auto-update-your-project-with-github/8124 for
// detailed help.

const cmd = require("node-cmd");
const express =  require("express");
const crypto = require("crypto"); // NPM Package "crypto" is pre-installed, so forget about digging search results again.
const app = express()

app.post('/webhooks/git-deploys/github/MaglubayTest123DHusdg', (req, res) => {
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
  return res.sendStatus(200).json({ status: 404, description: 'GitHub webhook message received, waiting for Glitch to update source code...'}); // Send back OK status
})

app.get('/webhooks/git-deploys/github/MaglubayTest123DHusdg', (req, res) => {
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
  return res.sendStatus(200).json({ status: 404, description: 'GitHub webhook message received, waiting for Glitch to update source code...'}); // Send back OK status
})