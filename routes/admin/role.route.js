const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/role.controller');

router.get('/', controller.index);

router.get('/permissions', controller.permissions);

router.patch('/edit-permissions', controller.editPermissions);

router.get('/create', controller.create);

router.post('/create', controller.createRole);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editRole);

router.delete('/delete/:id', controller.delete);

module.exports = router;