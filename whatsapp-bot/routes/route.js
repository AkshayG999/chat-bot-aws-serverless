const express = require('express')
const router = express.Router()
const { messageTypes } = require('../messageTypes/messageTypeController')
const logger = require("nirmitee-logger");


router.get('/', (req, res) => {
    res.send("Server Running")
})

router.post('/webhook', messageTypes)


router.get("/webhook", (req, res) => {

    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    logger.info({
        verify_token,
        mode,
        token,
        challenge
    })
    // Check if a token and mode were sent
    if (mode && token) {
        if (mode === "subscribe" && token === verify_token) {
            console.log("WEBHOOK_VERIFIED");
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    } else {
        res.status(200).json({})
    }

});

module.exports = router
