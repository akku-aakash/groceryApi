const User = require("../models/users");
const { deleteFile } = require("../helpers/file");
const _ = require('lodash')

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
  user.imgURL = req.file.path ? req.file.path.replaceAll(/\\/g, "/") : "";
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

exports.updateAddress = (req, res) => {
  let user = req.profile;

  user.address = [
    ...user.address,
    {
      city: req.body.city,
      address: req.body.address,
      zip: req.body.zip,
      lang: req.body.lang,
      long: req.body.long
    },
  ];
  // user = _.extend(user, {add})
  user.save((err, result) => {
    if (err) {
      return res.json({ message: err });
      console.log(err)
    } else {
      console.log(result)
      return res.json(result);
    }
  })
};

exports.editAddress = async (req, res) => {
  let user = await req.profile;
  const { _id, city, address, zip, lang, long } = req.body
  var index = null;

  await user.address.forEach((doc, ind) => {
    if (doc._id == _id) {
      index = ind
    }
  })

  if (index != null) {
    user.address[index] = {
      _id: _id,
      city: city,
      address: address,
      zip: zip,
      lang: lang,
      long: long
    }
  }

  // user = _.extend(user, {add})
  user.save((err, result) => {
    if (err) {
      return res.json({ message: err });
    } else {
      return res.json(result);
    }
  })
};

exports.serachprod = (req, res) => {
  name = req.query.name
  User.find({ $or: [{ firstName: { $regex: `${name}`, $options: 'i' } }, { email: { $regex: `${name}`, $options: 'i' } }] }).exec((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.json(data);
    }
  })
}

exports.swithuserrole = async (req, res) => {
  let user = await req.profile
  if (user.role == 0 || user.role == 1) {
    user.role = 2
    user.save((err, result) => {
      if (err) {
        return res.json({ message: err });
      } else {
        return res.json(result);
      }
    })
  } else {
    user.role = 0
    user.save((err, result) => {
      if (err) {
        return res.json({ message: err });
      } else {
        return res.json(result);
      }
    })
  }
}

exports.updateUsernow = (req, res) => {
  const user = req.profile;
  user.fcmtoken = req.body.fcmtoken;

  user.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.json({ message: "FCM token updated successfully !!!", data });
    }
  });
}