const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/order.controller');

const orderValidate = require('../../validates/client/order.validate');

router.get('/', orderValidate.orderProducts, controller.index);

router.post('/create', controller.create);

router.get('/list-order', controller.listOrder);

router.get('/history-order', controller.historyOrder);

router.patch('/change-received/:id', controller.changeReceived);

router.post('/buy-now/:id/:size/:quantity', controller.buyNow);

module.exports = router;