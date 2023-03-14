const User = require("../model/user.model");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (id !== req.userId)
      return res.status(400).send("you can delete only your account");

    await User.findByIdAndDelete(id);
    return res.status(200).send("user is deleted");
  } catch (err) {
    return res.status(404).json(err);
  }
};

module.exports = {
  deleteUser,
};
