const db = require("../db/queries")
const jwt = require("jsonwebtoken")

async function signUp(req, res) {
    console.log("test")
    console.log(req.body.userName, "test")
    await db.signUp(req.body.userName, req.body.password)
    res.sendStatus(200)
}


async function logIn(req, res) {
    res.status(202).cookie("jwt", "pog", {
        sameSite:'strict', 
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    }).send("cookie")
    const user = {
        id: 1,
        username: "spicy",
        email: "spicy@gmail.com"
    }
    jwt.sign({user}, "keep it spicy", {expiresIn: "10000s"}, (err, token) => {
        if (err) {
            console.log(err)
        }
        res.json({token: token})
    })
}

async function getInfo(req, res) {
    jwt.verify(req.token, 'keep it spicy', (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(403)
        }
        else {
            res.json({
                data
            })
        }
    })
    res.send("Recieved")
}

async function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else {
        res.sendStatus(403)
    }
}



module.exports = {signUp, logIn, verifyToken, getInfo}