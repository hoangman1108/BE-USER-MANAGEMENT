"use strict";

const locationService = require('../services/location.service');

class LocationController {
    async getAllLocation(req, res) {
        var listLocation = await locationService.readAllLocation();
        res.json(listLocation);
    }

    async getAllDistrictFromCity(req,res){
        var city_code = typeof(req.params.city_code) ==='string'?req.params.city_code:'';

        var listDistrict = await locationService.readLocationCities(city_code);
        res.json(listDistrict);
    }

    async getAllWithCityAndDistrict(req,res){
        var city_code = typeof(req.params.city_code) === 'string' ? req.params.city_code:'';
        var district_code = typeof(req.params.district_code) ==='string'?req.params.district_code:'';
        var list = await locationService.readLocationCitiesAndDistricts(city_code, district_code);
        res.json(list);
    }
}

module.exports = LocationController;