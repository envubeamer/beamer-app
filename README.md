beamer-app
==========

Beamer app with JavaScript, HTML5 and Enginio backend. 


#Basics for development
- Install node.js from http://nodejs.org/
- Install brunch.io (a JS app assembler) `npm install -g brunch`
- `git clone https://github.com/envubeamer/beamer-app.git`
- `npm install`
- `brunch watch --server`
==> Application is serving at [localhost:3333](http://localhost:3333/) and automatically recompiled when sources are changing



#Deployment environment
- Deployed to https://heroku.com/
- Account 
  - Email: envu.team1@gmail.com
  - Password: The one what is used for engin.io account too
- Application is visible at: http://envu-beamer-app.herokuapp.com/

#Deployment process
- Install Heroku Toolbelt https://toolbelt.heroku.com/
- `heroku login` + give there the account email + password when asked 
- `heroku keys:add`
- `heroku git:remote -a envu-beamer-app`
- `git push heroku master`
