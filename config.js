//configuration parameters for security lab server
var _ = require("underscore");
var path = require("path");
var finalEnv = process.env.NODE_ENV || "development";
var PORT = 7009;
var DB_CONNECT = 'mysql://group10:group10_pw@localhost/group10_db';
var COOKIE_SECRET = "SessionCookieSecretKey";
var HOSTNAME = "localhost";

exports.PORT = PORT;
exports.DB_CONNECT = DB_CONNECT;
exports.COOKIE_SECRET = COOKIE_SECRET;
exports.HOSTNAME = HOSTNAME;
