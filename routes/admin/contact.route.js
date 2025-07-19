const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/contact.controller');

router.get('/', controller.index);

router.delete('/delete/:id', controller.delete);

router.get('/detail/:id', controller.detail);

router.patch('/edit-status/:id', controller.editStatus);

module.exports = router;