const Gig = require("../model/gig.model");
const Order = require("../model/order.model");
const stripe = require("stripe")("sk_test_51MXOozKG4U03U9qEDkgoz4Kory5OS5p6GEug4OxUYpG50heJXNkuzRwMGaWbYuR23CoVBdLbLrZLY4nToAkaLSlA00z775sEGP")

const intent = async(req,res) => {
  
    const findGig = await Gig.findOne({_id: req.params.id})

    const paymentIntent = await stripe.paymentIntents.create({
      amount: findGig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    const newOrder = new Order({
      gigId: findGig._id,
      img: findGig.cover,
      title: findGig.title,
      buyerId: req.userId,
      sellerId: findGig.userId,
      price: findGig.price,
      payment_intent: paymentIntent.id,
    });
  
    await newOrder.save();
  
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
}

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

const confirm = async(req,res) => {
  const {paymentIntent} = req.body
  try {

    const updateOrder = await Order.findOneAndUpdate({payment_intent: paymentIntent}, {
      $set: {
        isCompleted: true
      }
    })

    return res.status(200).send("successed!")
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = {
  getOrders,
  intent,
  confirm
};
