require("dotenv").config();
const { Pool } = require("pg");
const connectionString = "postgresql://admin:admin@localhost:5432/quickchat"
module.exports = new Pool({
    connectionString,  
});