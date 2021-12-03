const router = require("express").Router()
const auth = require("../middleware/auth.js")
const requestModel = require("../models/requests.model");
//, auth("User"),
router.post("/newRequest", auth("User"), async(req, res) => {
    try {
        const requestDetails = new requestModel({
                ...req.body,
                requestorId: req.user._id
            })
            //console.log(requestDetails)
        await requestDetails.save()
        res.status(200).send({
            apiStatus: true,
            data: requestDetails,
            message: "pending request"
        })
    } catch (e) {
        res.status(500).send({
            apiStatus: false,
            message: e.message
        })
    }
})

router.get("/myRequests", auth("User"), async(req, res) => {
    try {
        await req.user.populate({
            path: "userRequests"
        })
        res.status(200).send({
            APIstatus: true,
            data: req.user.userRequests,
            message: " all pending request"

        })
    } catch (e) {
        res.status(500).send({
            APIstatus: false,
            message: e.message
        })
    }
})
router.patch("/editRequest/:id", auth("User"), async(req, res) => {
    try {
        const requestDetails = await requestModel.findOne({ _id: req.params.id })
        if (!requestDetails) throw new Error("Request not found")
        requestDetails.result = req.body.result
        await requestDetails.save()

        if (req.body.result == "Accepted") {
            req.user.friendsList.push(requestDetails.requesteeId)
            await req.user.save()
                // res.send(req.user)


        } else if (req.body.result == "ignored") {
            await requestModel.deleteOne({ _id: req.params.id })

        }


        res.status(200).send({
            APIstatus: true,
            // data: requestDetails,
            message: "result added successfully"
        })
    } catch (e) {
        res.status(500).send({
            APIstatus: false,
            data: e.message,
            message: "error add Result"
        })
    }
})

module.exports = router