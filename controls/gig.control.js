const Gig = require("../model/gig.model");

const createGig = async (req, res) => {
  if (!req.userId) return res.status(400).send("you must be authantication");

  try {
    const gigDoc = await (
      await Gig.create({ ...req.body, userId: req.userId })
    ).populate("userId");
    res.status(201).json(gigDoc);
  } catch (error) {}
};

const deleteGig = async (req, res) => {
  const { id } = req.params;
  const findGig = await Gig.findById(id);
  if (req.userId !== findGig.userId._id)
    return res.status(401).send("you can delete just your gig");

  try {
    await Gig.findByIdAndRemove(id);
    res.status(201).send("It has been deleted");
  } catch (error) {
    res.status(401).json(error);
  }
};

const gitGig = async (req, res) => {
  const { id } = req.params;
  try {
    const findGig = await Gig.findById(id).populate("userId");
    res.status(201).json(findGig);
  } catch (error) {
    res.status(401).json(error);
  }
};

const getGigs = async (req, res) => {
  const q = req.query;

  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.sarch && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters)
      .sort({ [q.sort]: -1 })
      .populate("userId");

    res.status(201).json(gigs);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  createGig,
  deleteGig,
  gitGig,
  getGigs,
};
