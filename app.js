const express = require('express');
const app = express();
const fs = require('fs');
const cors = require("cors");

const morgan = require('morgan');
const mongoose = require('mongoose')
//.env file
const dotenv = require('dotenv');
dotenv.config();
//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require("cookie-parser");
const multer = require('multer');


// const upload = multer();

mongoose.connect(
    process.env.MONGO_URI, { useUnifiedTopology: true,  useNewUrlParser: true }
).then(()=>console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err}`);
});
const myOwnMiddleware = (req,res,next) => {
    console.log("middleware applied");
    console.log(req.body);
    next(); // Pass the middleware loop to the next one otherwise the app would stuck here
};

//middleware

app.use(morgan("dev"));
// app.use(myOwnMiddleware);
// app.use(express.bodyParser());
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.multipart());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(upload.array());
app.use(express.static('public'));
// app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(expressValidator()); // Deprecated
app.use(cors());
app.use("/", postRoutes.router);
app.use("/", authRoutes.router);
app.use("/", userRoutes.router);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: "Unathorized"
        });
    }
});

app.get("/", (req,res)=>{
    fs.readFile("docs/apiDoc.json",(err,data)=>{
        if(err){
            return res.json({
                error:err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    // console.log("Node JS API is listening on port:" + port.toString());
    console.log(`Node JS API is listening on port: ${port}`); //use this ` not ' or "
});

