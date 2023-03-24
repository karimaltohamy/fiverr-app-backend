const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const gigRoute = require("./routes/gig.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");
const orderRoute = require("./routes/order.route");
const reviewRoute = require("./routes/review.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000


mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => console.log("mongodb is conected!"))
  .catch(() => console.log("mongodb is filed!"));

app.use(
  cors({
    credentials: true,
    origin: ["https://resplendent-kheer-ad1de7.netlify.app", "http://localhost:5173"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);

app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.send("index page");
});

app.listen(8000, () => {
  console.log("backend sever is runing!");
});

// password mongodb: KNq0a0tMFfGBiNzz
