const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
//.env file
const dotenv = require('dotenv');
dotenv.config();
//bring in routes
const postRoutes = require('./routes/post');

mongoose.connect(
    process.env.MONGO_URI, { useUnifiedTopology: true,  useNewUrlParser: true }
).then(()=>console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err}`);
});
// const myOwnMiddleware = (req,res,next) => {
//     console.log("middleware applied");
//     next(); // Pass the middleware loop to the next one otherwise the app would stuck here
// };

//middleware
// app.use(myOwnMiddleware);
app.use(morgan("dev"));

app.use("/", postRoutes.router);



const port = process.env.PORT || 8080;
app.listen(port, () => {
    // console.log("Node JS API is listening on port:" + port.toString());
    console.log(`Node JS API is listening on port: ${port}`); //use this ` not ' or "
});
