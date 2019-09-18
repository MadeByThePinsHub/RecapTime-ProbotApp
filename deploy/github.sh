# In this file, the Shell file automates some of our project members'
# deployment tasks from GitHub/GitLab into Glitch. See git-delpoys.js for more info.

# Fetch the newest code
git fetch origin master

# Hard reset
git reset --hard origin/master

# Force pull
git pull origin master --force