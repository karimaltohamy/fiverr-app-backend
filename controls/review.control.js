const Review = require("../model/review.model");
const Gig = require("../model/gig.model");

const createReview = async (req, res) => {
  if (req.isSeller)
    return res.status(400).send("Sellers can't create a review!");

  try {
    const findReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (findReview)
      return res
        .status(400)
        .send("You have already created a review for this gig!");

    const reviewDoc = await Review.create({
      gigId: req.body.gigId,
      userId: req.userId,
      desc: req.body.desc,
      star: req.body.star,
    });

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    return res.status(201).json(reviewDoc);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getReviews = async (req, res) => {
  const { gigId } = req.params;
  try {
    const getReviews = await Review.find({ gigId }).populate("userId");

    return res.status(201).json(getReviews);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const deleteReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const findReview = await Review.findById(id);
    if (req.userId !== findReview.userId.toString())
      return res.status(400).send("you can delete just your review!");

    await Review.findByIdAndDelete(id);
    return res.status(201).send("deleted!");
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReviews,
};
