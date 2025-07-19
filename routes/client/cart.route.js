const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/cart.controller');

const cartValidate = require('../../validates/client/cart.validate');

router.get('/', controller.index);

router.post('/add', cartValidate.addProductInCart, controller.addProductInCart);

router.delete('/delete', controller.deteleProductInCart);

router.patch('/edit/quantity', controller.editQuantityProductInCart);

router.patch('/edit/size', controller.editSizeProductInCart);

router.patch('/edit/checkout', controller.editCheckoutProductInCart);

router.patch('/edit/checkout/all', controller.checkoutAllProductInCart);

module.exports = router;