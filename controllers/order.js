const { Order } = require("../models/order");
const User = require("../models/users");

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .populate("user")
    .exec((err, res) => {
      if (err || !res) {
        return res.status(400).json(err);
      }
      req.order = res;
      next();
    });
};

exports.Orderfind = (req, res) => {
  return res.json(req.order);
};

exports.create = (req, res) => {
  req.body.order.user = req.profile;
  const { offerApplied } = req.body.order;
  const { copounsused } = req.profile;
  const order = new Order(req.body.order);

  order.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (offerApplied) {
        copounsused.push(offerApplied);
        User.updateOne(
          { _id: req.profile._id },
          { copounsused: copounsused },
          (err, save) => {
            if (err) {
              res.json({
                message: "Something Went Wrong in updating user !",
              });
            } else {
              return res.json({ data: data, save: save });
            }
          }
        );
      } else {
        return res.json(data);
      }
    }
  });
};

exports.listOrders = (req, res) => {
  Order.find({ user: req.profile._id })
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(orders);
    });
};

exports.deliveryBoy = (req, res) => {
  const { delId } = req.query;
  Order.find({ deliveryBoy: delId })
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      console.log(orders);
      res.json(orders);
    });
};

exports.allorders = (req, res) => {
  Order.find()
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(orders);
    });
};

exports.updateStaus = (req, res) => {
  const { deliveryname, status } = req.body;
  if (deliveryname) {
    Order.updateOne(
      { _id: req.order._id },
      { status: status, deliveryBoy: deliveryname },
      (err, save) => {
        if (err) {
          res.json({
            message: "Something Went Wrong in updating user !",
          });
        } else {
          res.json({
            message: "Order Updated !",
            data: save,
          });
        }
      }
    );
  } else {
    Order.updateOne({ _id: req.order._id }, { status: status }, (err, save) => {
      if (err) {
        res.json({
          message: "Something Went Wrong in updating user !",
        });
      } else {
        res.json({
          message: "Order Updated !",
          data: save,
        });
      }
    });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  let orders;
  const { userId } = req.params;
  try {
    orders = await Order.find({ user: userId });
  } catch (error) {
    res.status(500).json({ message: "Error while finding orders" });
  }

  if (!orders) {
    res.status(404).json({ message: "No orders found", orders: [] });
  }

  res.status(200).json({ orders });
};
