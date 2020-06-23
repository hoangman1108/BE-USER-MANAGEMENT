var {User} = require('../models/user.model');

module.exports.getAllUsers = async (req,res)=>{
    var user = await User.find({});
    res.json(user);
}

module.exports.getUser = async (req,res)=>{
    var user = await User.findOne({"username":req.params.id_user});
    res.status(200).json(user);
}

module.exports.postUser = (req,res)=>{
    User.create(req.body);
    res.json(req.body);
}

module.exports.putUser = async (req,res, next)=>{
    var entity = {
        username: req.params.id_user
    }
    var update=req.body;
    var option = {
        new:true
    }
    var user = await User.findOneAndUpdate(entity,update,option).then((item) => {
        if (!item) {
          const error = new Error('Bad Request.', 400);
          next(error);
        }
        else {
          res.status(201).json(item);
        }
    })
    // .catch(next);;
    // res.json(user);
}