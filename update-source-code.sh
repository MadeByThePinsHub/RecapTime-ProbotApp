#/bin/sh

# Add the original GitLab project to list of remote Git repositories
git remote add gitlab-origin https://gitlab.com/MadeByThePinsTeam-DevLabs/

# Fetch the newest code
git fetch origin master

# Hard reset
git reset --hard origin/master

# Force pull
git pull origin master --force