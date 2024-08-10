require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const apiRouter = require("./routes/apiRouter.js")
const mainRouter = require("./routes/mainRouter.js")

const port = process.env.PORT || 3000


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("test")
    return res.send("Recieved Request")
})
app.use("/api", apiRouter)
app.use("/", mainRouter)

app.listen(port, () => {
    console.log("Listening on port: " + String(port))
})
