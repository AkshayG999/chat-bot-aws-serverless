const { textReply } = require('../controllers/textReplyController')
const { interactiveReply } = require('../controllers/interactiveReplyController')
const { buttonReply } = require('../controllers/buttonReplyController')
const logger = require("nirmitee-logger");



const messageTypes = async (req, res) => {
    try {
        const { entry, object } = req.body

        logger.info({
            message:"Recieved message",
            ...req.body
        })



        if (object && entry[0]) {

            const { changes } = entry[0]
            const { value } = changes[0]
            const { messages } = value  //msg Object
                 //text messsage reply
            if (entry && entry[0] && changes && changes[0] && value && messages && messages[0].text) {
                return textReply(messages)
                // Interactive message reply
            } else if (entry && entry[0] && changes && changes[0] && value && messages && messages[0].interactive) {
                return interactiveReply(messages)
                // Button message reply
            } else if (entry && entry[0] && changes && changes[0] && value && messages && messages[0].button) {
                return buttonReply(messages)
            }
        }

        return res.sendStatus(200);
    } catch (err) {
        console.log(err)
    }


}

module.exports = { messageTypes }
