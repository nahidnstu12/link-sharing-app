import User from "@/backend/models/user.model";
import bcrypt from "bcryptjs";
import mongoose, { Types } from "mongoose";
import { BaseService } from "./base.service";

class UserService extends BaseService {
  async userList() {
    return User.find();
  }

  async findUser(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Provide valid user id");
    }
    return User.findById(id);
  }

  async createUser(body: object) {
    const newUser = new User(body);
    return await newUser.save();
  }

  async updateUser(body: any, id: string) {
    // TODO: need to validate body
    const modfiedBody = { ...body };
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Provide valid user id");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      modfiedBody,
      { new: true }
    );

    return updatedUser;
  }
  async deleteUser(id: string) {
    const user = await User.findById(id);
    if (!user) return false;
    return await User.findByIdAndDelete(new Types.ObjectId(id));
  }

  async fetchUser({ email, password }: any) {
    if (!email || !password) {
      return this.createResponse(400, "Email or password is missing.");
    }

    const user = await User.findOne({ email });
    console.log("fetchUser>>", user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return this.createResponse(400, "Invalid email or password.");
    }

    // const token = this.createToken({
    //   type: 'JWT',
    //   username: user.username,
    //   email: user.email
    // })

    return this.createResponse(200, "User fetch successful.", { user });
  }
  async fetchProfile({ email, userId }: any) {
    if (!email || !userId) {
      return this.createResponse(400, "Missing userId or email");
    }

    // const user = await User.findOne({ email, _id: userId }).select("-password");

    const userProfile = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "links",
          localField: "_id",
          foreignField: "user_id",
          as: "links",
        },
      },
      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]);

    if (!userProfile || userProfile.length === 0) {
      throw new Error("User not found");
    }

    return this.createResponse(200, "User fetch successful.", userProfile[0]);
  }
}

export default UserService;
