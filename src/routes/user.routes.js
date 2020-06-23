"use strict";
const express = require('express');
const validate = require('../utils/validateRequest');
const router = express.Router();

const userControllerExport = require('../controllers/user.controller');
const userController = new userControllerExport();
router.get('/',userController.getAllUsers);
router.get('/profiles/:id_user',userController.getUser);
router.post('/',validate.user,userController.postUser);
router.put('/profiles/:id_user',userController.putUser);
router.delete('/profiles/:id_user',userController.deleteUser);
module.exports = router;