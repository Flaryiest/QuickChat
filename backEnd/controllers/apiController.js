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
                        secure: true,
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                    }).send("cookie")
                })
            }
            
        })
    }

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