require("dotenv").config();
const { Pool } = require("pg");
const connectionString = "postgresql://admin:admin@localhost:5432/spontaneity"
module.exports = new Pool({
    connectionString,  
});