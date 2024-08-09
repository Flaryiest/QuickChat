const pool = require("./pool.js")

async function signUp(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES (($1), ($2))"), [username, password]
}

module.exports = {signUp}