const express = require('express')
const router = express.Router()
const { create, editsub, getitnow, list, deliverystatus, orderIDdst, 
    getitnowOp, getitnowOpOp, orderIDdstdst } = require('../controllers/deliverystatus')

router.post('/deliveryboystatus/create', create)
router.get('/deliveryboystatus/list', list)
router.put('/deliveryboystatus/edit/:deliverystatusId', editsub)
router.get('/deliveryboystatus/:deliverystatusId', getitnow)
router.get('/deliveryboys/byorderId/:orderIDD', getitnowOp)
router.get('/deliveryboys/bydelId/:delIDD', getitnowOpOp)

router.param('deliverystatusId', deliverystatus)
router.param('orderIDD', orderIDdst)
router.param('delIDD', orderIDdstdst)
module.exports = router