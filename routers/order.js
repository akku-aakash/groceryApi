const express = require('express')
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { create, orderById, listOrders } = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product')

router.post('/order/create/:userId', requireSignin, isAuth, decreaseQuantity, create);
router.get('/order/list/:userId', requireSignin, isAuth, listOrders)
// router.get('/order/status-value/:userId', requireSignin, isAuth, isAdmin,getStatusValue)
// router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin,updateOrderStatus)

router.param('userId', userById);
router.param('orderId', orderById);
module.exports = router;