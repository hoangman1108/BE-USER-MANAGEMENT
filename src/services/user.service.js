var { User } = require('../models/user.model');
const auth = require('../components/auth');

exports.readUsers = async () => {
    return await User.find();
}
exports.readUser = async (username) => {
    return User.findOne({ username });
}
exports.createUser = async function (user) {
    var password = await auth.hashPassword(user.password);
    user.password = password;
    var temp = User.create(user);
    return temp;
}

exports.deleteUser = async function (username) {
    var user = await User.deleteOne({
        username
    });
    return user;
}

exports.updateUser = async function (username, update) {
    var entity = {
        username
    }

    if (update.password) {
        update.password = await auth.hashPassword(update.password);
    }

    data = await User.updateOne(entity, update, (err, res) => {
        if (err) {
            return err;
        } else {
            return res;
        }
    });
    return data;

}