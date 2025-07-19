const express = require('express');
const router = express.Router();

const controller = require('../../controllers/client/user.controller');

const authMiddleware = require('../../middlewares/client/auth.middleware');

const userValidate = require('../../validates/client/user.validate');

router.get('/login', controller.login);

router.post('/login', userValidate.login, controller.loginUser);

router.get('/register', controller.register);

router.post('/register', userValidate.register, controller.registerUser);

router.get('/profile/:id', authMiddleware.requireAuth, controller.profile);

router.patch('/edit/:id', userValidate.edit, controller.edit);

router.get('/logout', controller.logout);


module.exports = router