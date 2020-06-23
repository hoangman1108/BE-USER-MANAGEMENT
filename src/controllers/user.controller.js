var { User } = require('../models/user.model');
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

// exports.getAllUsers = async (req,res)=>{
//     var user = await User.find({});
//     res.json(user);
// }

// exports.getUser = async (req,res)=>{
//     var user = await User.findOne({"username":req.params.id_user});
//     res.status(200).json(user);
// }

// exports.postUser = async (req,res)=>{
//     var temp = await userService.createUser(req.body);
//     res.send(temp);
// }

// exports.putUser = async (req,res, next)=>{
//     var entity = {
//         username: req.params.id_user
//     }
//     var update=req.body;
//     var option = {
//         new:true
//     }
//     var user = await User.findOneAndUpdate(entity,update,option).then((item) => {
//         if (!item) {
//           const error = new Error('Bad Request.', 400);
//           next(error);
//         }
//         else {
//           res.status(201).json(item);
//         }
//     })
//     // .catch(next);;
//     // res.json(user);
// }

// module.exports.deleteUser = async (req,res)=>{
//     var username = req.params.id_user;
//    var user = await userService.deleteUser(username);
//     res.send(user);
// }
