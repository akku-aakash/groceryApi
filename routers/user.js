const express = require("express");
const router = express.Router();
const {
  userById,
  deliveryBoy,
  read,
  updateUser,
  lists,
  updateWallet,
  getUserById,
  updateAddress,
  editAddress
} = require("../controllers/user");
const { isAuth, requireSignin } = require("../controllers/auth");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/user/:userId", requireSignin, isAuth, read);
router.put(
  "/user/:userId",
  requireSignin,
  isAuth,
  upload.single(`photo`),
  updateUser
);
router.put('/user/add/address/:userId', updateAddress)
router.put('/user/edit/address/:userId', editAddress)
router.get("/deliveryboy", deliveryBoy);
router.put("/update/wallet/:userId", updateWallet);

router.get("/admin/allusers", lists);
router.get("/admin/user/:userId", getUserById);

router.param("userId", userById);

module.exports = router;
