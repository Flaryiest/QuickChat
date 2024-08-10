require("dotenv").config()
const {Client} = require("pg")

const SQL = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR(255), password VARCHAR(255)); CREATE TABLE IF NOT EXISTS chats (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, chatName VARCHAR(255), userID INTEGER); CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, chatID INTEGER, userID INTEGER, message TEXT, messageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://admin:admin@localhost:5432/quickchat"
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main()