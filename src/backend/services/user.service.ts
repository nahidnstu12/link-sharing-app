import { UPLOAD_DIR } from "@/@core/helpers/constants";
import User from "@/backend/models/user.model";
import bcrypt from "bcryptjs";
import fs, { promises as fsPromises } from "fs";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { cookies } from "next/headers";
import path from "path";
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

  async getAuthenticatedUser() {
    const cookieStore = cookies();
    const authToken = cookieStore.get("token");

    if (!authToken?.value) {
      return null;
    }

    const key = process.env.NEXT_PUBLIC_SECRET_KEY as string;
    const decoded: any = jwt.verify(authToken.value, key);

    return this.findUser(decoded?.userId);
  }

  async deleteOldFile(photoPath: string) {
    if (photoPath) {
      const oldFilePath = path.resolve(UPLOAD_DIR, path.basename(photoPath));
      if (fs.existsSync(oldFilePath)) {
        await fsPromises.unlink(oldFilePath);
      }
    }
  }
  async uploadNewFile(file: File, userId: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = path.extname(file.name);
    const newFileName = `${userId}-${Date.now()}${fileExtension}`;
    const filePath = path.resolve(UPLOAD_DIR, newFileName);

    // Create the upload directory if it doesn't exist
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Write the new file
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${newFileName}`;
  }
 
}

export default UserService;
