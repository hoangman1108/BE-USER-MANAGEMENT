const express = require('express');
const validate = require('../utils/validateRequest');
const router = express.Router();

const userController = require('../controllers/user.controller');
router.get('/',userController.getAllUsers);
router.get('/profiles/:id_user',userController.getUser);
router.post('/',validate.user,userController.postUser);
router.put('/profiles/:id_user',userController.putUser);
module.exports = router;