// const { body, validationResult } = require('express-validator');

exports.userSignupValidator = (req,res,next)=>{
    //name not null and 4-10
    req.check("name","Name is required").notEmpty();
    
    //email
    // req.check("email","Write a body").notEmpty();
    req.check("email","Email must be between 3 to 2000 characters").matches(/.+\@.+\..+/).withMessage("Email must contain @").isLength({
        min: 4,
        max: 2000
    });
    
    //check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password").isLength({min: 6}).withMessage("Password must contain atleast 6 characters")
    .matches(/\d/).withMessage("Password must contain a number");
    
    // check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen
    if(errors){
        // const firstError = errors.map((error) => error.msg)[0];
        const firstError = errors[0].msg;
        return res.status(400).json({error: firstError});
    }
    //next middleware
    next();
}

// const { body, validationResult } = require('express-validator');

exports.createPostValidator = (req,res,next)=>{
    req.check("title","Write a title").notEmpty();
    req.check("title", "Title must be between 4 to 150 characters").isLength({
        min: 4,
        max: 150
    });
    req.check("body","Write a body").notEmpty();
    req.check("body", "Body must be between 4 to 2048 characters").isLength({
        min: 4,
        max: 2048
    });
    // check for errors
    const errors = req.validationErrors();

    //if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    //next middleware
    next();
}