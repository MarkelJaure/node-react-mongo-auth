const dotenv = require('dotenv');
const path = require('path');
var chalk = require('chalk');
var mongoose = require('mongoose');
//require chalk module to give colors to console text

const root = path.join.bind(this, __dirname, "../../");
dotenv.config({ path: path.join(__dirname, "../.env") });


//require database URL from enviroment file
var dbURL = process.env.MONGO_URI;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = function () {

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);

  mongoose.connect(dbURL);

  mongoose.connection.on('connected', function () {
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });

  mongoose.connection.on('error', function (err) {
    console.log(error("Mongoose default connection has occured " + err + " error"));
  });

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(termination("Mongoose default connection is disconnected due to application termination"));
      process.exit(0)
    });
  });
}