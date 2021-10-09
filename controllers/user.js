const User = require("../models/users");
const { deleteFile } = require("../helpers/file");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ message: "User Not Found" });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  const user = req.profile;

  if (user.imgURL) {
    deleteFile(user.imgURL);
  }
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.imgURL = req.file.path;
  user.address = [
    ...user.address,
    {
      city: req.body.city,
      address: req.body.address,
      zip: req.body.zip,
    },
  ];
  user.copounsused = [];

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.json({ message: "User updated Successfully", data });
    }
  });
};

exports.updateAddress = (req, res) => {};

exports.lists = (req, res) => {
  User.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    return res.json(data);
  });
};

exports.deliveryBoy = (req, res) => {
  User.find({ role: 2 }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      return res.json(data);
    }
  });
};

exports.updateWallet = (req, res) => {
  const amount = req.body.amount;
  User.updateOne(
    { _id: req.profile._id },
    { $inc: { coins: -parseInt(amount) } },
    (err, save) => {
      if (err) {
        res.json({
          message: "Something Went Wrong in updating user !",
        });
      } else {
        res.json({
          message: "Transaction Added !",
          data: save,
        });
      }
    }
  );
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while finding user" });
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  user.imgURL = user.imgURL.replace(/\\/g, "/");

  res.status(200).json({ user });
};
