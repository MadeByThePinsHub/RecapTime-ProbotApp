Recap Time Probot App for GitHub
======

An GitHub app that combined some other apps into one solution.

# Looking for Repository Links?
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp?ref=badge_shield)


We deploy codebase updates thru automations without messing up the project members to use `git push` commands because
GitLab pulls the updates from Glitch then pushes to GitHub.

* Glitch (the original one) - https://glitch.com/edit/#!/recaptime-probotapp
* GitLab (the middleware where the pulls and pushes happens) - https://gitlab.com/MadeByThePinsTeam-DevLabs/recaptime-probotapp
* GitHub (the target remote repo) - https://github.com/MadeByThePinsHub/RecapTime-ProbotApp

# Setup on your Target GitHub account/repo

You can also read [this article on our
Freshdesk Help Center](https://supportcentral-madebythepins.freshdesk.com/support/solutions/articles/47000150407-deploying-the-app-to-your-github-repo/)
to learn more about how you set up

## Installation
To get started using the bot, here are the steps to deploy this bot to your repo.

- First, login to your GitHub account.
- Then, [click here](https://github.com/apps/recap-time-probot-app/installations/new) to open installation page.
- Select where the app to deploy. If you choose not to deploy the app to all of your current repositories (plus future ones), choose
- After that, the app is successfully installed. See follow-up steps for details.
- To test whetever the bot is working for your own repo, try to test features first if working. If not, see `docs/troubleshooting/basic-help.md` for help.

## Follow-up
- See [the documentation website](https://probot-docs.recaotiem.tk) for more information as to avoid the folder mess.

# Commands Help

For the full scoop, use `/help` to see full list of available working commands and `/help [command]` for help
about an command.

- `/help` - sends the full list of available commands. Also includes documetation links.
- `/addlabel [label]` - adds an label to an issue/PR.
- `/rmlabel [label]` - same as `/addlabel` but it'll removes


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp?ref=badge_large)