"use strict";
const express = require('express');
const router = express.Router();
const ClassLocationController = require('../controllers/location.controller');
const locationController = new ClassLocationController();
router.get('/',locationController.getAllLocation);
router.get('/cities/:city_code/district',locationController.getAllDistrictFromCity);
router.get('/cities/:city_code/districts/:district_code/ward', locationController.getAllWithCityAndDistrict);
module.exports = router;