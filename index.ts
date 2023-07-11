// import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

// import dotenv
import { config } from "dotenv";
config();

// database connection
import connnectDatabase from "./src/framework/database/config/dbConfig";

// import the route file
import userRoute from "./src/interface/routes/userRoutes";

// creat express application
const app = express();

// cors setting
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CORS_ORIGIN_URL as string ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// make change in session data
declare module "express-session" {
  interface SessionData {
    stepOneOtp:number | null ;
  }
}
// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// user route
app.use('/', userRoute);

// database connecting & app listen
const port = process.env.PORT || 8000;
connnectDatabase()
  .then((res) => {
    console.log(res);
    app.listen(port, (): void => console.log(`Server running...`));
  })
  .catch((error) => console.log(`Failed to connect database`, error));
