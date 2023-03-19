const Message = require("../model/message.model")
const Conversation = require("../model/conversation.model");


const createMessage = async(req,res) => {
    try {
        const messageDoc = await Message.create({
            conversationId:req.body.conversationId ,
            userId:req.userId ,
            desc:req.body.desc ,
        })
        
        await Conversation.findOneAndUpdate({id:req.body.conversationId }, {
            $set: {
                readBySeller: req.isSeller,
                readByBuyer: !req.isSeller,
                lastMessage: req.body.desc
            }
        },{
            new: true
        })

        return res.status(201).json(messageDoc)

    } catch (error) {
        return res.status(400).send(error);
    }
}


const getMessages = async(req,res) => {
    try {
        const meassges = await Message.find({conversationId: req.params.id})
        return res.status(201).json(meassges)
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    createMessage,
    getMessages
}

