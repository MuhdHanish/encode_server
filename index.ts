// import dependencies
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


// import dotenv
import { config } from "dotenv";
config();

// database connection
import connnectDatabase from "./src/framework/database/config/dbConfig";

// import the route file
import userRoute from "./src/interface/routes/userRoutes";
import tokenRoute from "./src/interface/routes/tokenRoutes"

// creat express application
const app = express();

// cors setting
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CORS_ORIGIN_URL as string],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// middleware for json
app.use(express.json());
// middleware for handle form data
app.use(express.urlencoded({ extended: true }));
// middleware for cookies
app.use(cookieParser());
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
    app.listen(port, (): void => console.log(`Server running...`));
  })
  .catch((error) => console.log(`Failed to connect database`, error));
