require("dotenv").config()
const express = require("express")

const app = express()

const PORT = process.env.PORT || 5000

app.get("/", async (req, res) => {
    res.send("<h1>Hii. Server is up and running</h1>")
})

app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`)
})
