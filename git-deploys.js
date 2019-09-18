// In this code uses Express and Node-CMD packages to auto-update your Glitch project
// with either GitHub, GitLab or both of them.
// See https://support.glitch.com/t/tutorial-how-to-auto-update-your-project-with-github/8124 for
// detailed help.

const cmd = require("node-cmd");
const express =  require("express");
const crypto = require("crypto"); // NPM Package "crypto" is pre-installed, so forget about digging search results again.
const app = express()

app.post('/git-deploys/github', (req, res) => {
    let hmac = crypto.createHmac("sha1", process.env.GitHub_webhookSecret);
  let sig  = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  
  if (req.headers['x-github-event'] == "push") {
  cmd.run('chmod 777 github.sh'); /* :/ Fix no perms after updating */
  cmd.get('./deploy/github.sh', (err, data) => {  // Run our script
    if (data) console.log(data);
    if (err) console.log(err);
  });
  cmd.run('refresh');  // Refresh project
  console.log("> [GIT] Updated with origin/master");
}
  return res.sendStatus(200); // Send back OK status
});