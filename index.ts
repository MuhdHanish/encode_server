import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const port = process.env.PORT || 3000;
app.listen(port, (): void => console.log(`Server running...`));

