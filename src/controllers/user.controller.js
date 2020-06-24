var userService = require('../services/user.service');

class UserController {
    async getAllUsers(req, res) {
        var user = await userService.readUsers();
        res.json(user);
    };

    async getUser(req, res) {
        var username = req.params.id_user;
        var user = await userService.readUser(username);
        res.status(200).json(user);
    };

    async postUser(req, res) {
        var temp = await userService.createUser(req.body);
        res.send(temp);
    }
    async putUser(req, res) {
        var username = req.params.id_user;
        var result = await userService.updateUser(username, req.body);
        res.json(result);
    }
    async deleteUser(req, res) {
        var username = req.params.id_user;
        var user = await userService.deleteUser(username);
        res.send(user);
    } 
}

module.exports = UserController;


