var { User } = require('../models/user.model');
const auth = require('../components/auth');

exports.readUsers = async () => {
    return await User.find();
}
exports.readUser = async (username) => {
    return await User.findOne({ username });
}
exports.createUser = async function (user) {
    var password = await auth.hashPassword(user.password);
    user.password = password;
    var entity = {
        username: user.username,
        password: user.password,
        phone: user.phone,
        name: user.name,
        location: {
            city: user.city[0],
            city_code: user.city[1],
            district: user.district[0],
            district_code: user.district[1],
            ward: user.ward[0],
            ward_code: user.ward[1]
        }
    }
    var temp = User.create(entity);
    return temp;
}

exports.deleteUser = async function (username) {
    var user = await User.deleteOne({
        username
    });
    return user;
}

function isEmptyObject(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

exports.updateUser = async function (username, update) {
    var user = {
        username
    }
    var entity = {};
    var location = {};

    if (update.phone) {
        entity.phone = update.phone;
    }

    if (update.name) {
        entity.name = update.name
    }

    if (update.city) {
        location.city = update.city;
    }
    if (update.city_code) {
        location.city_code = update.city_code;
    }

    if (update.district) {
        location.district = update.district;
    }

    if (update.district_code) {
        location.district_code = update.district_code;
    }
    if (update.ward_code) {
        location.ward_code = update.ward_code;
    }

    if (update.ward) {
        location.ward = update.ward;
    }

    if (update.password) {
        entity.password = await auth.hashPassword(update.password);
    }


    if (!isEmptyObject(location)) {
        var temp = await User.findOne({ username });
       const locationTemp = Object.assign(temp.location,location);
       entity.location = locationTemp;
    }


    data = await User.updateOne(user, entity, (err, res) => {
        if (err) {
            return err;
        } else {
            return res;
        }
    });
    return data;

}