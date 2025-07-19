const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/buy-now.controller');

const validate = require('../../validates/client/buy-now.validate');

router.get('/:id/:size/:quantity', validate.buyNowProduct,  controller.buyNow);

module.exports = router;