const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: './public/uploads/' })
const router = express.Router();

const controller = require('../../controllers/client/contact.controller.js');

router.get('/', controller.index);

router.post('/', upload.single('message'), controller.sendContact);

module.exports = router;