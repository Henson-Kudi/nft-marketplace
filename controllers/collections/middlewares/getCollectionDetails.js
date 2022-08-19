const pool = require("../../../database")

module.exports = async (req, res) => {
    const { collection_id } = req.params

    const collectionQs = `
        SELECT * FROM collections WHERE id = $1 LIMIT 1
    `
    const nftsQs = `
        SELECT * FROM nfts  WHERE collection_id = $1
    `

    try {
        const {
            rows: [collection],
        } = await pool.query(collectionQs, [collection_id])

        const { rows: nfts } = await pool.query(nftsQs, [collection_id])

        return res.status(200).json({ collection, nfts })
    } catch (err) {
        return res.status(500).json(err)
    }
}
