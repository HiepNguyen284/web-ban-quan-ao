const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/staff.controller');

router.get('/', controller.index);

router.patch('/change-role/:account_id/:role_id', controller.changeRole);

router.delete('/delete/:id', controller.delete);

router.patch('/change-status/:id', controller.changeStatus);

router.get('/detail/:id', controller.detail);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editAccount);

module.exports = router;