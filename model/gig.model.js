const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    cat: { type: String, required: true },
    cover: { type: String, required: true },
    images: { type: [String], required: true },
    desc: { type: String, required: true },
    shortTitle: { type: String, required: false },
    shortDesc: { type: String, required: false },
    delivaryTime: { type: String, required: true },
    revisionNumber: { type: String, required: true },
    addFeatures: { type: [String], required: false },
    price: { type: Number, required: true },
    sales: { type: Number, default: 0 },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig;
