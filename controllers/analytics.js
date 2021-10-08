const mongoose = require("mongoose");
const Subscription = require("../models/subscription");
const User = require("../models/users");
const Product = require("../models/product");
const { Order } = require("../models/order");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");
const Leafcategory = require("../models/leafcategory");
const City = require("../models/cites");
const Offer = require("../models/offers");
const Queries = require("../models/queries");

module.exports.someAnalytics = async (req, res) => {
  let totalUsers = 0;
  let totalProducts = 0;
  let totalOrders = 0;
  let totalCategories = 0;
  let totalSubCategories = 0;
  let totalLeafCategories = 0;
  let totalCities = 0;
  let totalDeliveryBoys = 0;
  let totalOffers = 0;
  let subscribedUsers = 0;

  try {
    totalUsers = await User.countDocuments();
    totalProducts = await Product.countDocuments();
    subscribedUsers = await Subscription.countDocuments();
    totalOrders = await Order.countDocuments();
    totalCategories = await Category.countDocuments();
    totalSubCategories = await Subcategory.countDocuments();
    totalLeafCategories = await Leafcategory.countDocuments();
    totalCities = await City.countDocuments();
    totalDeliveryBoys = await User.countDocuments({ role: 2 });
    totalOffers = await Offer.countDocuments();
  } catch (error) {
    res.status(500).json({ error: error });
  }

  res.status(200).json({
    totalUsers: totalUsers,
    totalProducts: totalProducts,
    subscribedUsers: subscribedUsers,
    totalOrders: totalOrders,
    totalCategories: totalCategories,
    totalSubCategories: totalSubCategories,
    totalLeafCategories: totalLeafCategories,
    totalCities: totalCities,
    totalDeliveryBoys: totalDeliveryBoys,
    totalOffers: totalOffers,
  });
};

module.exports.someMoreAnalytics = async (req, res) => {
  let totalRevenue = 0;
  let totalQueries = 0;
  let solvedQueries = 0;
  let unsolvedQueries = 0;
  let unprocessedOrders = 0;
  let confirmedOrders = 0;
  let shippedOrders = 0;
  let processedOrders = 0;
  let deliveredOrders = 0;
  let cancelledOrders = 0;

  try {
    totalQueries = await Queries.countDocuments();
    solvedQueries = await Queries.countDocuments({ isSolved: true });
    unsolvedQueries = await Queries.countDocuments({ isSolved: false });
    unprocessedOrders = await Order.countDocuments({ status: "Not processed" });
    confirmedOrders = await Order.countDocuments({ status: "Confirmed" });
    shippedOrders = await Order.countDocuments({ status: "Shipped" });
    processedOrders = await Order.countDocuments({ status: "Processing" });
    deliveredOrders = await Order.countDocuments({ status: "Delivered" });
    cancelledOrders = await Order.countDocuments({ status: "Cancelled" });
  } catch (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({
    totalQueries,
    solvedQueries,
    unsolvedQueries,
    unprocessedOrders,
    confirmedOrders,
    shippedOrders,
    processedOrders,
    deliveredOrders,
    cancelledOrders,
    // totalRevenue,
  });
};

module.exports.getRevenue = async (req, res) => {
  let totalRevenue = 0;

  totalRevenue = await Order.aggregate([
    {
      $group: { _id: null, totalRevenue: { $sum: "$amount" } },
    },
  ]);
  console.log("Revenue - " + totalRevenue);

  res.status(200).json({ totalRevenue });
};
