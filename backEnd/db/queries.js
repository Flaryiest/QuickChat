const pool = require("./pool.js")

async function signUp(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES (($1), ($2))", [username, password])
}

async function login(username) {
    const {rows} = await pool.query("SELECT * FROM users WHERE username = ($1)", [username])
    return rows[0]
}

async function getChats(userID) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [userID])
    return rows
}

async function getMessages(chatID) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE chatID = ($1)", [chatID])
    return rows
}

async function getUsers() {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY username ASC")
    return rows
}

module.exports = {signUp, login, getChats, getMessages, getUsers}