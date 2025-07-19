const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const router = express.Router();

const controller = require('../../controllers/admin/category.controller');

const categoryValidate = require('../../validates/admin/category.validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('thumbnail'), categoryValidate.fillInfo, controller.createCategory);

router.get(`/detail/:id`, controller.detail);

router.get(`/edit/:id`, controller.edit);

router.patch(`/edit/:id`, upload.single('thumbnail'), categoryValidate.fillInfo, controller.editCategory);

router.delete('/delete/:id', controller.delete);

module.exports = router;