const db = require("../db/queries")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


async function signUp(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        db.signUp(req.body.username, hash)
    });
    res.sendStatus(200)
}


async function logIn(req, res) {
    let userInfo = await db.login(req.body.username)
    console.log(userInfo, "test")
    if (userInfo == null) {
        res.sendStatus(400)
    }
    else {
        bcrypt.compare(req.body.password, userInfo.password, function(err, result) {
            if (err) {
                console.log(err)
            }
            else {
                jwt.sign({userInfo}, "keep it spicy", {expiresIn: "10000s"}, (err, token) => {
                    if (err) {
                        console.log(err)
                    }
                    res.status(202).cookie("jwt", token, {
                        sameSite:'lax', 
                        path: "/",
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    }).send("cookie")
                })
            }
            
        })
    }

}

async function getInfo(req, res) {
    res.send("Recieved")
}

async function verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        
        return res.sendStatus(403);
    }
    jwt.verify(token, "keep it spicy", (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded.userInfo;
        next();
    });

}

async function getChats(req, res) {
    const chats = await db.getChats(req.user.username)
    console.log(chats, "chats")
    res.json(chats)
}

async function getMessages(req, res) {

}

async function getUsers(req, res) {
    const users = await db.getUsers(req.user.username)
    users.forEach((user) => {
        delete user.password
    })
    res.json(users)
}

async function createChat(req, res) {
    await db.createChat(req.user.username, req.body.username)
    res.sendStatus(200)
}

async function sendMessage(req, res) {
    if (req.body.chatID == null) {
        res.sendStatus(200)
        
    }
    else {
        await db.sendMessage(req.user.id, req.body.message, req.body.chatID)
        res.sendStatus(200)
    }

}

async function getMessages(req, res) {
    const messages = await db.getMessages(req.body.chatID)
    console.log(messages, "messages")
    if (messages != null) {
        res.json(messages)
    }
    else {
        res.sendStatus(418)
    }
}

async function checkLoggedIn(req, res) {
    const token = req.cookies.jwt
    if (token) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(202)
    }
}

async function logOut(req, res) {
    res.clearCookie("jwt")
    res.send(200)
}

async function getUser(req, res) {
    console.log(req.user, "test")
    res.json(req.user)
}

module.exports = {signUp, logIn, verifyToken, getInfo, getChats, getUsers, createChat, sendMessage, getMessages, checkLoggedIn, logOut, getUser}