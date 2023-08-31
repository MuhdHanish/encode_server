// import dependencies
import { Socket } from "socket.io";
import express from "express";
import morgan from "morgan";
import cors from "cors";


// import dotenv
import { config } from "dotenv";
config();

// database connection
import connnectDatabase from "./src/framework/database/config/dbConfig";

// import the route file
import userRoute from "./src/interface/routes/userRoutes";
import tokenRoute from "./src/interface/routes/tokenRoutes"
import { User } from "./src/domain/models/User";

// creat express application
const app = express();

// cors setting
const allowedOrigins = ["http://localhost:5173", process.env.CORS_ORIGIN_URL as string];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// middleware for json
app.use(express.json());
// middleware for handle form data
app.use(express.urlencoded({ extended: true }));
// middleware for log
app.use(morgan("dev"));

// user route
app.use('/', userRoute);
app.use('/refresh/token', tokenRoute);

// database connecting & app listen
const port = process.env.PORT || 8000;
connnectDatabase()
  .then((res) => {
    console.log(res);
    const server = app.listen(port, (): void => console.log(`Server running...`));
    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: allowedOrigins,
      },
    });
    io.on("connection", (socket: Socket) => {
      socket.on("connnect-to-online", (roomId:string) => {
        socket.join(roomId);
        socket.emit("connected-to-online");
      });
      socket.on("join-to-chat", (roomId:string) => {
        socket.join(roomId);
        console.log(`User joined to room: ${roomId}`);
      });
      socket.on("typing", (roomId:string) => socket.to(roomId).emit("typing"));
      socket.on("stop-typing", (roomId: string) => socket.to(roomId).emit("stop-typing"));
      socket.on("new-message", (newMessageRecieved) => {
         let chat = newMessageRecieved?.chat;
         if (!chat?.users) return console.log(`in this chat no users found`);
         chat?.users.forEach((user:User) => {
           if (user?._id === newMessageRecieved?.sender?._id) return;
           socket.to(user?._id?.toString() as string).emit("message-recieved", newMessageRecieved);
         });
      });
    });
  })
  .catch((error) => console.log(`Failed to connect database`, error));
