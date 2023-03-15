const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, country } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (findUser) return res.status(400).send("This user exists");

    const hassPass = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      email,
      password: hassPass,
      country,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("user not found!");

    const passOk = bcrypt.compareSync(req.body.password, user.password);

    if (!passOk) return res.status(400).send("wrong password or username!");

    const token = jwt.sign(
      { userId: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(info);
  } catch (error) {
    return res.status(404).json(error);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = {
  register,
  login,
  logout,
};
