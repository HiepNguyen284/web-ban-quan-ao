const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const router = express.Router();

const controller = require('../../controllers/admin/product.controller');

const productValidate = require('../../validates/admin/product.validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), productValidate.createProduct, controller.createProduct);

router.get('/detail/:id', controller.detail);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', upload.single('thumbnail'), productValidate.editProduct, controller.editProduct);

router.delete('/delete/:id', controller.delete);

module.exports = router;