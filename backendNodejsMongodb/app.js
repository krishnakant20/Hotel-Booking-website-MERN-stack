import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();
app.use(cors())
app.use(cookieParser())
app.use(express.json());

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb database connected with nodejs");
  } catch (error) {
    console.log(error);
    throw(error)
  }
};


mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected! now");
});
 
app.get("/",(req,res)=>{
  res.send("namaste, sweet home")
})

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  console.log("hello from error handler of app.js",err)
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connectMongodb();
  console.log("nodejs server started");
});
