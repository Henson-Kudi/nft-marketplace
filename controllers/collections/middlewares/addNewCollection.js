const pool = require("../../../database")

module.exports = async (req, res) => {
    const data = req.body

    const qs = `
        INSERT INTO
            collections(
                name,
                description,
                logo,
                cover,
                url_format,
                creator,
                owner,
                website,
                discord,
                telegram,
                instagram,
                facebook,
                youtube,
                category_id
            )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
    `

    try {
        const { rows } = await pool.query(qs, [
            data.name,
            data.description,
            data.logo,
            data.cover,
            data.url_format,
            data.creator,
            data.owner,
            data.website,
            data.discord,
            data.telegram,
            data.instagram,
            data.facebook,
            data.youtube,
            data.category_id,
        ])
        res.status(200).json({ message: "Success", code: 200, data })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}
