const config = require("../../../knexfile");
const knex = require("knex");
const env = process.env.NODE_ENV;
let connection;
if (env === "development") {
  connection = knex(config.development);
  console.log(env);
} else {
  connection = knex(config.production);
  console.log(env);
}

module.exports = connection;
