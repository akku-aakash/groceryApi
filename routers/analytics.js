const express = require("express");
const {
  someAnalytics,
  someMoreAnalytics,
  getRevenue,
} = require("../controllers/analytics");
const router = express.Router();

router.get("/analytics", someAnalytics);
router.get("/analytics/more", someMoreAnalytics);
router.get("/analytics/revenue", getRevenue);

module.exports = router;
