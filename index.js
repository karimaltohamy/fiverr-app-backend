const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const gigRoute = require("./routes/gig.route");
const conversationRoute = require("./routes/convarsation.route");
const messageRoute = require("./routes/message.route");
const orderRoute = require("./routes/order.route");
const reviewRoute = require("./routes/review.route");

const app = express();

mongoose
  .connect(
    "mongodb+srv://karim_altohamy:KNq0a0tMFfGBiNzz@cluster0.tgw2gul.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongodb is conected!"))
  .catch(() => console.log("mongodb is filed!"));

app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);

app.listen(8000, () => {
  console.log("backend sever is runing!");
});

// password mongodb: KNq0a0tMFfGBiNzz
