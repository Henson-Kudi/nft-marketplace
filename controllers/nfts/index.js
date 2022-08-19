const Router = require("express").Router()
const pool = require("../../database")
const approveNft = require("./middlewares/approveNft")
const mintNft = require("./middlewares/mintNft")

Router.route("/").get(async (req, res) => {
    const qs = `SELECT * FROM nfts`

    try {
        const { rows: nfts } = await pool.query(qs)
        return res.status(200).json(nfts)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

Router.post("/mint-nft", mintNft)

Router.post("/approve-nft", approveNft)

module.exports = Router
