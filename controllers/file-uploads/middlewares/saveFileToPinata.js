const { storeFileFromFs } = require("../../../scripts/upload-to-pinata")
const path = require("path")
const fs = require("fs")

const unlinkFile = async (filePath) =>
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err)
            return
        }

        console.log("removed file")
    })

module.exports = async (req, res) => {
    const imageFile = req.files.image
    const audioFile = req.files.audio
    const videoFile = req.files.video

    try {
        if (!imageFile) {
            throw { message: "Please add an image" }
        }

        const imageFilePath = path.join(process.cwd(), "images", imageFile.name)

        let responses = { image: null, audio: null, video: null }

        const response = await storeFileFromFs(imageFilePath)

        await unlinkFile(imageFilePath)

        responses.image = response

        if (audioFile) {
            const audioFilePath = path.join(process.cwd(), "audios", audioFile.name)

            const response = await storeFileFromFs(audioFilePath)

            await unlinkFile(audioFilePath)

            responses.audio = response
        }

        if (videoFile) {
            const videoFilePath = path.join(process.cwd(), "videos", videoFile.name)

            const response = await storeFileFromFs(videoFilePath)

            await unlinkFile(videoFilePath)

            responses.video = response
        }

        res.status(200).json(responses)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}
