# Enterprise Level Project Architechture for Node.js Application (Consuming Express.js)


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Project is a BoilerPlate with inclusion for User Registration and Login Apis via "json web token" purpose of making this project is when it comes to node.js    the most common framework is express , but it is quite simple which is good as no magic is happening on the background it's pretty straightforward it loads the dependencies that you will need to get going  but many people that came form frameworks  like .NET and Laravel will find it  difficult  or even if you belong to javascript community there will come a point where you will want to stucture your code especially for big projects when you could have hurndreds or thousands of files.

It's a very basic MVC stucture that is provided here with service layer  it's open source project and i will welcome any contributors and suggestions along the way . 
or any issues you can point out . it's still under-development but you can clone it and use for your own project . Because the stucture and flow of the project will not change but i am planing to add some more security features in coming days 

## Project Architechture

  - We are using express as a framework but we modify the project stucture according to our needs  , we are using  MVC along with service Layer
  - Folder Stucture is as Follow
    - App(Bussiness Logic ) 
      - Models
      - Controller
      - Services
      - Routes
      - Utilities
      - Middleware
    - Config (Project Configurations DB Setup | Envioronment Goes here)
    - Bin (Starts The server)
    - Logs (All Apllication Logs will be placed under this folder)
    - Public 
### Project Lifecycle
  - Application | Server bootup from bin folder "start.js" which runs the imported code from "server.js" it loads up all the needed packages that are essential for the app to work
  
    - Config
      - Config folder handles all the envioronment related stuff like node-env
      - Database connection file
      - Any Thirld Party Integration etc
    - Routes
      - From "Server.js" All the requests are mapped to "Api.routing.js"
      - "Api.routing.js" loads all the routes files that are under App/Routes That have ".routes.js" extension e.g => "example.route.js"
      - example.route.js suppose to export a router object with all the routes in it
    - Validation | Middleware | controllers
       - validation function  and controllers respective methods are called against each route the respective method will recieve request,response and callback method(next)
    - Controller
      - Once in Controller function , it will call respective serice where all the bussiness logic is handeled, to interact with db services call the respective Models
    - Models (Models are the Layer that interact with DB)
  
  
### Third Party Packages

*    "@babel/cli": "^7.6.4",
*    "@babel/core": "^7.7.2",
*    "@babel/node": "^7.7.0",
*    "@babel/polyfill": "^7.6.0",
*   "@babel/preset-env": "^7.6.3",
*    "@babel/register": "^7.6.2",
*    "@types/body-parser": "^1.17.1",
*    "@types/express": "^4.17.1",
*   "@types/jest": "^24.0.23",
*    "axios": "^0.19.0",
*    "babel-eslint": "^7.2.3",
*    "babel-plugin-transform-decorators-legacy": "^1.3.4",
*    "babel-plugin-transform-runtime": "^6.23.0",
*    "babel-preset-latest": "^6.24.1",
*    "babel-preset-stage-0": "^6.24.1",
*    "babel-register": "^6.24.1",
*    "body-parser": "^1.19.0",
*    "compression": "^1.7.4",
*    "conduit-app-error": "^1.0.3",
*    "conduit-app-response": "^1.0.3",
*    "cors": "^2.8.5",
*    "cross-env": "^6.0.3",
*    "crypto-js": "^4.0.0",
*    "dotenv": "^8.1.0",
*    "express": "^4.17.1",
*    "helmet": "^3.21.1",
*    "http-status": "^1.4.0",
*    "install": "^0.13.0",
*    "joi": "^14.3.1",
*    "joi-phone-number": "^3.1.1",
*    "jsonwebtoken": "^8.5.1",
*    "knex": "^0.19.5",
*    "knex-logger": "^0.1.0",
*    "knex-paginator": "^2.0.0",
*    "lodash": "^4.17.15",
*    "morgan": "^1.9.1",
*    "mssql": "^5.1.0",
*    "nconf": "^0.10.0",
*    "node-pre-gyp": "^0.14.0",
*    "npm-run-all": "^4.1.5",
*    "rimraf": "^3.0.0",
*    "swagger-jsdoc": "^3.4.0",
*    "tedious": "^6.6.0",
*    "uuidv4": "^6.0.0",
*    "winston": "^3.2.1",
*    "winston-daily-rotate-file": "^4.2.1"




### Installation

#### MW.BS.Loyalty.API  
Requires Node version 12 or above and Npm version to be 6 and above

Install the dependencies and devDependencies and start the server.

```sh
$ cd/{$ROOT_DIERECTORY}
$ npm install -d
$ npm run start:dev
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
$ npm run start:prod
```


### Security Practices We are Using:
#####  Token Verification Validation:
##



