const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/account.controller');

const validate = require('../../validates/admin/account.validate');

router.get('/login', controller.login);

router.post('/login', controller.loginAccount);

router.get('/register', controller.register);

router.post('/register', validate.register, controller.registerAccount);

router.get('/logout', controller.logout);

router.get('/profile', controller.profile);

module.exports = router;