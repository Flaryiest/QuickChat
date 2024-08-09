const express = require("express")
const apiRouter = express.Router()
const apiController = require("../controllers/apiController.js")
apiRouter.post("/signup", apiController.signUp)

apiRouter.get("/login", apiController.logIn)

apiRouter.get("/getInfo", apiController.verifyToken, apiController.getInfo)

module.exports = apiRouter