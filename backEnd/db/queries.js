const pool = require("./pool.js")

async function signUp(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES (($1), ($2))", [username, password])
}

async function login(username) {
    const {rows} = await pool.query("SELECT * FROM users WHERE username = ($1)", [username])
    return rows[0]
}

async function getChats(username) {
    const { rows } = await pool.query("SELECT * FROM chats WHERE usernameone = ($1) OR usernametwo = ($1) OR usernamethree = ($1) OR usernamefour = ($1) OR usernamefive = ($1)", [username])
    return rows
}

async function getMessages(chatID) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE chatID = ($1)", [chatID])
    return rows
}

async function getUsers(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username != ($1) ORDER BY username ASC", [username])
    return rows
}

async function createChat(usernameOne, usernameTwo) {
    await pool.query("INSERT INTO chats (usernameone, usernametwo) VALUES (($1), ($2))", [usernameOne, usernameTwo])
}

async function sendMessage(userID, message, chatID) {
    await pool.query("INSERT INTO messages (chatID, userID, message) VALUES (($1), ($2), ($3))", [chatID, userID, message])
}

async function getMessages(chatID) {
    const {rows} = await pool.query("SELECT * FROM messages WHERE chatID = ($1)", [chatID])
    return rows
}

async function setProfilePicture(imageURL, userID) {
    console.log(imageURL, userID, "in query")
    await pool.query("UPDATE USERS SET picture = ($1) WHERE id = ($2)", [imageURL, userID])
}

async function getProfilePicture(userID) {
    const {rows} = await pool.query("SELECT picture FROM users WHERE id = ($1)", [userID])
    console.log(rows)
    return rows
}

module.exports = {signUp, login, getChats, getMessages, getUsers, createChat, sendMessage, getMessages, setProfilePicture, getProfilePicture}