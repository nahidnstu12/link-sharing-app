import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: "string", required: true, unique: true },
    first_name: { type: "string", required: false },
    last_name: { type: "string", required: false },
    password: { type: "string", required: true },
    photo_path: { type: "string", required: false },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
