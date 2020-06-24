var { User } = require('../models/user.model');
exports.readAllLocation = async ()=>{
    return await User.find();
}

exports.readLocationCities = async (city_code)=>{
    var list = await User.find({'location.city_code':city_code})
    return list;
}

exports.readLocationCitiesAndDistricts = async(city_code, district_code)=>{
    var list = await User.find({'location.city_code':city_code, 'location.district_code':district_code});
    return list;
}

