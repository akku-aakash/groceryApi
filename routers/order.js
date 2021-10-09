const express = require("express");
const router = express.Router();
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  create,
  orderById,
  listOrders,
  updateStaus,
  allorders,
  Orderfind,
  deliveryBoy,
  getOrdersByUserId,
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  decreaseQuantity,
  create
);
router.get("/order/list/:userId", requireSignin, isAuth, listOrders);
router.get("/order/allorder", allorders);
router.get("/orders/deliveryId", deliveryBoy);
router.get("/order/:orderId", Orderfind);
router.put("/update/order-status/:orderId", updateStaus);
router.get("/admin/orders/:userId", getOrdersByUserId);

router.param("userId", userById);
router.param("orderId", orderById);
module.exports = router;
