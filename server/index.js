const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoute");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
console.log('CORS middleware configured');

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
// const url = `mongodb+srv://rrakesh:abcd1234@cluster0.xphhmog.mongodb.net/chat?retryWrites=true&w=majority`;

//const password = encodeURIComponent("abcd1234");

const url = `mongodb+srv://rrakesh:Rakesh02@cluster0.wdwnag8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

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

const io = socket(server,{
    cors:{
        origin:process.env.ORIGIN,
        credentials:true,
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
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
  