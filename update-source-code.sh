#/bin/sh

# Add the original GitLab project to list of remote Git repositories
git remote set origin https://gitlab.com/MadeByThePinsTeam-DevLabs/RecapTime-Staff/recaptime-probotapp/

# Fetch the newest code
git fetch gitlab-origin master

# Hard reset
git reset --hard gitlab-origin/master

# Force pull
git pull gitlab-origin master --force
