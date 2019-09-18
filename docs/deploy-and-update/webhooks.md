# Deploying and Updating Code

In this documentation

# Updating Codebase

## Using Webhooks in GitHub

- First of all, configure the `git-deploys.js` file first. We pre-configured the file for you, just in case you use it on your own servers.
- Next, create `GitHub_webhookSecret` with an value to make things works. This way, nobody should mess up the webhooks without this secret. Your `.env` file should looks like this:
```env
APP_ID=XXXXX
WEBHOOK_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
PRIVATE_KEY_PATH=/path/to/your/private/key/here.pem
NODE_ENV=production
PRIVATE_KEY="---START PRIATE KEY---\n3ydbdh8984nj3bd\n[CENSORED]\ngjeidi493dh\n---END PRIVATE KEY---"
GitHub_webhookSecret=your_secret_here
```
- Go to your GitHub repository's Webhooks settings and click **Add Webhook**. as shown in the screenshot below.
![](https://aws1.discourse-cdn.com/business6/uploads/glitch/original/2X/b/ba0c5e9c089ea407087dd2e37e2c255aae0889ce.png)
- Copy your target webhook URL. It should like this: `https://your-project.glitch.me/webhooks/deploy/git-deploys/github` (the URL may depends on your configuration on `git-deploys.js` file).
![](https://aws1.discourse-cdn.com/business6/uploads/glitch/optimized/2X/6/6c3c6eeeb0d0cff36034f952ac8e8afbeeb88097_2_532x500.png)

- Don't forget to add your secret passcode before submitting the form and test.
![](https://aws1.discourse-cdn.com/business6/uploads/glitch/original/2X/3/358c9394e3b449e1e1127ae94dd1ebdde188ebde.png)

- Check your console logs to see if GitHub successfully sent the test message.