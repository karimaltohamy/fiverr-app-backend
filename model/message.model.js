const mongoose = require("mongoose");

const meassageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meassage = mongoose.model("Meassage", meassageSchema);

module.exports = Meassage;
