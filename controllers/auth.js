const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const twilioNum = process.env.TWILIO_PHONE_NUMBER;
const User = require("../models/users");

exports.sendOTP = (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const token = jwt.sign(
    {
      phone,
      otp,
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: "5m",
    }
  );

  client.messages
    .create({
      body: `Your One Time Login Password For Wildberries is ${otp}`,
      from: twilioNum,
      to: phone,
    })
    .then((messages) => {
      return res.json({ token, messages });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });

  // return res.json({ otp, token });
};

exports.verifyOTP = (req, res) => {
  const userphone = req.body.phone;
  const hashtoken = req.body.token;
  const userotp = req.body.otp;

  if (hashtoken) {
    jwt.verify(hashtoken, process.env.JWT_ACCOUNT_ACTIVATION, (err, decode) => {
      if (err) {
        return res.json({ message: "Otp Expired Login Again" });
      } else {
        const { phone, otp } = jwt.decode(hashtoken);
        if (userotp == otp && userphone == phone) {
          console.log("User Verified");
          User.findOne({ phone }).exec((err, userdata) => {
            console.log(userdata);
            if (err) {
              return res.status(400).json({ message: "Something Went Wrong" });
            } else if (userdata == null) {
              const user = new User({
                phone,
              });
              user.save((err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: "Something Went Wrong" });
                } else {
                  const token = jwt.sign(
                    {
                      _id: data._id,
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "14d",
                    }
                  );

                  return res.json({
                    token,
                    userdata: {
                      _id: data._id,
                      newUser: true
                    },
                  });
                }
              });
            } else {
              const token = jwt.sign(
                {
                  _id: userdata._id,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "14d",
                }
              );
              return res.json({ token, userdata: { ...userdata, newUser: false } });
            }
          });
        } else {
          return res.json({ message: "Incorrect Otp" });
        }
      }
    });
  }
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = async (req, res, next) => {
  let user = (await req.profile) && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(400).json({ error: "Access denied" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  let user = (await req.profile) && req.auth && req.profile._id == req.auth._id;
  console.log(user);
  if (user.role !== 1) {
    return res.status(400).json({ error: "Access denied" });
  }
  next();
};
