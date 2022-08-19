const newHistory = require("../../../utils/newHistory")
const pool = require("../../../database")

module.exports = async (req, res) => {
    const data = req.body

    data.value = data.price_decimal

    const updateQs = `
        UPDATE nfts SET
            status = 'unlisted',
            updated_at = CURRENT_DATE,
            approved = false,
            start_time = null,
            end_time = null,
            owner = $1
        WHERE
            token_id = $2 AND
            nft_address = $3
    `

    const deleteQs = `DELETE FROM listings WHERE nft_address = $1 AND token_id = $2`

    const deleteAuctionQs = `DELETE FROM auctions WHERE nft_address = $1 AND token_id = $2`

    const deleteOffersQs = `DELETE FROM offers WHERE nft_address = $1 AND token_id = $2`

    try {
        await pool.query(updateQs, [data.owner, data.token_id, data.nft_address])

        await newHistory(data)

        await pool.query(deleteQs, [data.nft_address, data.token_id])

        await pool.query(deleteAuctionQs, [data.nft_address, data.token_id])

        await pool.query(deleteOffersQs, [data.nft_address, data.token_id])

        return res.status(200).json({ message: "Offern accepted, token transfered.", status: 200 })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
