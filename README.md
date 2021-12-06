# starterpack-be

Basic starter package for backend API development. 

## Included in this Starterpack
* node with babel
* expressjs
* airbnb eslint rules

## Usage
In your project directory:
```bash
git remote add starter https://github.com/JY2452/starterpack-be.git
git pull starter master --allow-unrelated-histories
```


To pull a specific release version, change "master" to the namee of the tag.
For example:
```bash
git pull starter reactOnly --allow-unrelated-histories
```

Once pulled, install your webpack dependencies:
```bash
npm install
```

## Deploying to Heroku
* Head over to Heroku and login/sign up. Then, create a new app.
* Go to Deploy and select “Github” as your Deployment Method
* Find and connect to the right repository, then turn on Automatic Deploys for the main branch

## Connecting to MongoDB Atlas
* Create an account at cloud.mongodb.co
* Select the free Shared Clusters.
* Pick most the defaults, in particular under Cluster Tier Select the M0 Sandbox (which is free). Don’t turn on backups as that will add cost.
* This will create a “Project 0” with “Cluster 0”. You are limited to 1 free cluster per project, so later on you may want to create more. 
* Create an access username and password (auto-generated). Save them.
* In Network Access, select Allow Access From Anywhere
* Click Clusters -> Connect -> Connect Your Application
* Copy the connection string into a safe place and replace password with the password you saved earlier

## Connecting Heroku to MongoDB
* Go to dashboard.heroku.com.
* Go to Settings -> Reveal Config Vars 
* This is where you can add environment variables — a great place for things like api keys and connection strings.
* Add a key MONGODB_URI and paste the connection string you saved above into it. Remember to replace password with the actual password.

## References
* [Dartmouth CS 52 API Tutorial](https://cs52.me/assignments/lab/redux-platform+server/)