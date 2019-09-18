# Deploying and Updating Code

In this documentation

# Updating Codebase

## Using Webhooks in GitHub

- First of all, configure the `git-deploys.js` file first. We pre-configured the file for you, just in case you use it on your own servers.
- Next, create `GitHub_webhookSecret` with an value to make things works. This way, nobody should mess up the webhooks without this secret. Your `.env` file should looks like this:
```env
APP_ID=XXXXX
WEBHOOK_SECRET=
PRIVATE_KEY_PATH=/path/to/your/private/key/here.pem
NODE_ENV=production
PRIVATE_KEY=
GitHub_webhookSecret=
```

![](https://aws1.discourse-cdn.com/business6/uploads/glitch/original/2X/b/ba0c5e9c089ea407087dd2e37e2c255aae0889ce.png)
