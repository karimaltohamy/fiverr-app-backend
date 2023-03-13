const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.Types.ObjectId, ref: "Gig", required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    star: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    desc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
