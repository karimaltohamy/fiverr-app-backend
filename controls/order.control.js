const Gig = require("../model/gig.model");
const Order = require("../model/order.model");

const createOrder = async (req, res) => {
  try {
    const findGig = await Gig.findById(req.params.gigId);

    const OrderDoc = await Order.create({
      gigId: req.params.gigId,
      img: findGig.cover,
      title: findGig.title,
      price: findGig.price,
      sellerId: findGig.userId,
      buyerId: req.userId,
      payment_intent: "payment",
    });

    return res.status(201).json(OrderDoc);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    return res.status(201).json(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
};
