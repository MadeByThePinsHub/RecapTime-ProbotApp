[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/MadeByThePinsHub/RecapTime-ProbotApp) 

Recap Time Probot App for GitHub
======
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp?ref=badge_shield)
An GitHub app that combined some other apps into one solution, open-sourced and free to use without any strings.

## Looking for Repository Links?
We deploy codebase updates thru automations without messing up the project members to use `git push` commands because
GitLab pulls the updates from Glitch then pushes to GitHub.

* Glitch (the origin) - <https://glitch.com/edit/#!/recaptime-probotapp>
* GitLab (where the CI tests our code) - <https://gitlab.com/MadeByThePinsTeam-DevLabs/recaptime-probotapp>
* GitHub (here, [where the things will archived every Feburary 2 after 5 years](https://archiveprogram.github.com/)) - <https://github.com/MadeByThePinsHub/RecapTime-ProbotApp>

## Setup on your Target GitHub account/repo

You can also read [this article on our
Freshdesk Help Center](https://supportcentral-madebythepins.freshdesk.com/support/solutions/articles/47000150407-deploying-the-app-to-your-github-repo/) to learn more about how you set up

### Easy-to-Deploy Option
To get started using the bot, here are the steps to deploy this bot to your repo.

- First, login to your GitHub account.
- Then, [click here](https://github.com/apps/recap-time-probot-app/installations/new) to open installation page.
- Select where the app to deploy. If you choose not to deploy the app to all of your current repositories (plus future ones), choose
- After that, the app is successfully installed. See follow-up steps for details.
- To test whetever the bot is working for your own repo, try to test features first if working. If not, see `docs/troubleshooting/basic-help.md` for help.

### Hardcore Challenge
If you want to use the soruce code for your organization, do the following steps below. Requires Node.js and NPM (check the `pakcage.json` file for details) and knowledge in Javascript to continue.

- Fork your own copy of this repository and then clone to your machine or somewhere.
- Customize your code, including the installation info.
- When ready, deploy the code into cloud or on-premises.

### Follow-up
- See [the documentation website](https://probot-docs.recaptime.tk) for more information as we want to seperate the documentation from our messier code. That website is also open-sourced on GitLab at https://gitlab.com/MadeByThePinsTeam-DevLabs/recap-time/probot-docs.recaptime.tk

## Commands Help

For the full scoop, use `/help` to see full list of available working commands and `/help [command]` for help
about an command.

- `/help` - sends the full list of available commands. Also includes documetation links.
- `/addlabel [label]` - adds an label to an issue/PR. (You can as many labels as you can.)
- `/rmlabel [label]` - same as `/addlabel` but it'll removes labels.
- `/about` - about the bot, including installation info.

## License Status
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMadeByThePinsHub%2FRecapTime-ProbotApp?ref=badge_large)
