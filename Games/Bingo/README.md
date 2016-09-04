# Getting Started guide

loads the required dependencies.
```
npm install

bower install 
```

Start the node server and browser-sync for dev environment.
Replace the FB_CLIENT_SECRET value in serve.js.
```
return nodemon({
      script: 'server/app.js',
      env: { 'FB_CLIENT_SECRET': 'FBClientSecret' },
      watch: ['server/**/*.*']
    })
```
```
gulp
```

Start the node server for production environment. 
Replace the FBClientKey with your key.
```
FB_CLIENT_KEY="FBClientKey" node server/app
```
