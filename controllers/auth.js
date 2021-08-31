const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const expressJwt = require('express-jwt');

exports.signup = async (req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error: "Email is taken!"
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({
        message: "Signup Success! Please Login!!!"
    })
}

exports.signin = (req,res) =>{
    //find the user based on email

    const {email, password} = req.body;
    User.findOne({email: email},(err, user)=>{
        //if err or no user
        if(err||!user){
            return res.status(401).json({
                error: "User with that email does not exists. Please Sign up"
            })
        }
        //if user is found make sure tthe email and password match
        //create authnticate method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Wrong Password"
            })
        }
        //generate a token with user id and secret
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        // The json {_id } gets stored in the token and is accessible 
        //persist the token as't' in cookie with expiry date
        res.cookie("t",token,{expire: new Date() + 9999});
        //return response with user and token to frontend client
        const {_id,name,email} = user;
        return res.json({token,user:{
            _id,email,name
        }});
    });
}

exports.signout = (req,res) => {
    res.clearCookie("t");
    return res.json({
        message: "Signout Success"
    })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],  // needed for later version
    //if the token is valid, express jwt appends the verified user's id in auth key (json format) and append to the request object
    userProperty: "auth"
    // The Stored json object can be expressed through the auth object
});