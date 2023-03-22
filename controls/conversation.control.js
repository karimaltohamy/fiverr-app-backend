const Conversation = require("../model/conversation.model");

const createConversation = async (req, res) => {
  try {
    const conversationDoc = await Conversation.create({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });

    return res.status(201).json(conversationDoc);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({createdAt: -1})
    return res.status(201).json(conversations);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return res.status(404).send("not found")
    return res.status(201).json(conversation);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateConversation = async (req, res) => {
  try {
    const updateConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      {
        new: true,
      }
    );
    return res.status(201).json(updateConversation);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
  updateConversation,
};
