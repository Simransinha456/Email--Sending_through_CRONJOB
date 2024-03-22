import express from "express";
import mongoose from "mongoose";
import customCron from "./cron.js";
import UserModel from "./models/userModel.js";

const app = express();
app.use(express.json());

// //Connect to MongoDB using Mongoose
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://simran:simran@cluster0.alfad2u.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connect();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

customCron.sendMailAllUser();

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
