import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("UserModel", UserSchema); // usermodels will show in database
export default UserModel;
