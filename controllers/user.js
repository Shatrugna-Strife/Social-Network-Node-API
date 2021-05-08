const User = require("../models/user");
const _ = require("lodash");

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err||!user){
            return res.status(400).json({
                error: "User not found."
            })
        }
        req.profile = user; // adds profile object in req with user info
        next();
    })
    // next(); This would jump to the next middleware without caring if the above code got executed or not
}

exports.hasAuthorization = (req,res,next)=>{
    let authorized = false;
    if (req.profile!=undefined){
        authorized = req.auth && req.profile._id.toString() === req.auth._id;
    }
    //const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    if(!authorized){
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
    next();
}

exports.allUsers = (req,res) => {
    User.find().select("name email updated created").exec((err, users)=>{ //do it like this find().exec(()=>) or find({}, ()=>). do not use then find().then
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        res.json({users});
    });
}


exports.getUser = (req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}


exports.updateUser = (req,res,next) => {
    let user = req.profile;
    user = _.extend(user, req.body); // extend - mutate the source object updates details mentioned in the body.
    user.updated = Date.now();

    user.save((err)=>{
        if(err){
            return res.status(400).json({
                error: "You are not authorised to perform this action"
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
        next();
    });
}

exports.deleteUser = (req,res,next) => {
    let user = req.profile;
    user.remove((err, user)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
            message: "Account deleted successfully"
        });
    })
}