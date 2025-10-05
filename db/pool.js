const { Pool } = require("pg");
require("dotenv").config();

let config = {};
if (process.env.NODE_ENV === "PROD") {
  config = {
    user: process.env.prod_user,
    password: process.env.prod_pass,
    host: process.env.prod_host,
    port: process.env.prod_port,
    database: process.env.prod_database,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.prod_ssl,
    },
  };
} else {
  config = {
    user: process.env.db_user,
    password: process.env.db_pass,
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_database,
  };
}

module.exports.pool = new Pool({
  connectionString: process.env.internal_db_url,
});
module.exports.dbConfig = config;
