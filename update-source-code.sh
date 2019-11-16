#/bin/sh

# Add the original GitLab project to list of remote Git repositories
git remote add gitlab-origin https://gitlab.com/MadeByThePinsTeam-DevLabs/

# Fetch the newest code
git fetch gitlab-origin master

# Hard reset
git reset --hard gitlab-origin/master

# Force pull
git pull gitlab-origin master --force
