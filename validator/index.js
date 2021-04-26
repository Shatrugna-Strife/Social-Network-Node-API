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