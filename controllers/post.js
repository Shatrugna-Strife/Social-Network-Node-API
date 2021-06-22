const Post = require('../models/post');
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = (req,res)=>{
    // res.json({
    //     posts: [
    //         {title: "First Post"},
    //         {title: "Second Post"}
    //     ]
    // });
    const posts = Post.find().populate("postedBy", "_id name").select("_id title body").then((posts)=>{
        res.status(200).json({
            posts: posts
        });
    }).catch(err=>console.log(err));
};

exports.createPost = (req,res, next) => {
    // return res.json({
    //     mesasge:"afasf"
    // });
    // next();
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // console.log("re.profile",req.profile);
    form.parse(req, (err, fields, files)=>{
        console.log(fields);
        if(err){
            // console.log(err);
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            res.json(result);
            next();
        });
    });
};

exports.postsByUser = (req,res,next) =>{
    console.log("debug123")
    Post.find({postedBy:req.profile._id}).populate("postedBy", "_id name").sort("created").exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        return res.json(posts);
    });
}