const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    requestorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requesteeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    result: { type: String, trim: true, default: "" },

})
const Request = mongoose.model("Request", requestSchema)
module.exports = Request