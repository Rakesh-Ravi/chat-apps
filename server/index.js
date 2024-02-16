const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
console.log('CORS middleware configured');

app.use(express.json());
app.use("/api/auth", userRoutes);
// const url = `mongodb+srv://rrakesh:abcd1234@cluster0.xphhmog.mongodb.net/chat?retryWrites=true&w=majority`;

//const password = encodeURIComponent("abcd1234");

const url = `mongodb://localhost:27017/chat`

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(url)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});


// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const {MongoClient} = require("mongodb");
// const userRoutes = require("./routes/userRoutes");

// const app = express();


// app.use(cors());
// app.use(express.json());

// app.use("/api/auth",userRoutes);


// MongoClient.connect(process.env.MONGO_URL, {
//   }).then(() => {
//     console.log("DB Connection Successful");
//   }).catch((err) => {
//     console.log(err.message);
//   });
  
//   const server = app.listen(process.env.PORT, () => {
//     console.log(`Server Started on Port ${process.env.PORT}`);
//   });
  