import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { BaseService } from "./base.service";

interface AuthBody {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

class AuthService extends BaseService {
  private async isUserExists(email: string) {
    return User.findOne({
      email,
    });
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private createToken(payload: object) {
    // TODO: FIX later
    const key = process.env.NEXT_PUBLIC_SECRET_KEY as string;

    return jwt.sign(payload, key, { expiresIn: "1d" });
  }

  // Register user
  async registerUser(body: AuthBody) {
    const { first_name, last_name, email, password } = body;

    if (!first_name || !last_name || !password || !email) {
      return this.createResponse(400, "Authentication info is missing.");
    }

    const existingUser = await this.isUserExists(email);

    if (existingUser) {
      return this.createResponse(
        400,
        "An account already exists with this email"
      );
    }

    const hashedPassword = await this.hashPassword(password);
    try {
      await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      return this.createResponse(201, "User successfully registered.");
    } catch (err) {
      return this.createResponse(400, "User cannot successfully registered.");
    }
  }

  // Login user
  async loginUser(body: AuthBody) {
    const { email, password } = body;

    if (!email || !password) {
      return this.createResponse(400, "Credentials is missing.");
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return this.createResponse(400, "Invalid Credentials.");
    }

    const token = this.createToken({
      type: "JWT",
      email: user.email,
      userId: user?._id,
    });

    return this.createResponse(200, "Login successful.", { token });
  }
}

export default AuthService;
