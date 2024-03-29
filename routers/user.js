const express = require("express");
const router = express.Router();
const {
  userById,
  deliveryBoy,
  updateUserwithoutimg,
  read,
  updateUser,
  lists,
  updateWallet,
  getUserById,
  updateAddress,
  editAddress,
  serachprod,
  swithuserrole,
  updateUsernow
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
router.put(
  "/user/completeprofile/:userId",
  requireSignin,
  isAuth,
  updateUserwithoutimg
);
router.put('/user/add/address/:userId', updateAddress)
router.put('/user/edit/address/:userId', editAddress)
router.get("/deliveryboy", deliveryBoy);
router.get('/search/user', serachprod)
router.put("/update/wallet/:userId", updateWallet);
router.put("/switch/role/:userId", swithuserrole);
router.put(
  "/user/details/:userId",
  // requireSignin,
  // isAuth,
  updateUsernow
);
router.get("/admin/allusers", lists);
router.get("/admin/user/:userId", getUserById);

router.param("userId", userById);

module.exports = router;
