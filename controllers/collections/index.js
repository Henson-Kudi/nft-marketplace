const addNewCollection = require("./middlewares/addNewCollection")
const getCollectionDetails = require("./middlewares/getCollectionDetails")
const getCollections = require("./middlewares/getCollections")
const updateCollection = require("./middlewares/updateCollection")

const Router = require("express").Router()

Router.route("/").get(getCollections).post(addNewCollection)

Router.route("/:collection_id").get(getCollectionDetails).put(updateCollection)

module.exports = Router
