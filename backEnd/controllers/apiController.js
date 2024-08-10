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
                console.log("logged in")
                jwt.sign({userInfo}, "keep it spicy", {expiresIn: "10000s"}, (err, token) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(token)
                    res.status(202).cookie("jwt", token, {
                        sameSite:'strict', 
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
    console.log(req.user)
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
    console.log(req.user)
    const chats = await db.getChats(req.user.id)
    console.log(chats)
    res.json(chats)
}

async function getMessages(req, res) {

}

async function getUsers(req, res) {
    const users = await db.getUsers()
    users.forEach((user) => {
        delete user.password
    })

}

module.exports = {signUp, logIn, verifyToken, getInfo, getChats, getUsers}