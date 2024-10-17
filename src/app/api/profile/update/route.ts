import { resolveService } from "@/backend/services/base.service";
import UserService from "@/backend/services/user.service";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  try {
    const userService = await resolveService(UserService);
    const body = await request.json();
    const cookieStore = cookies();
    const authToken = cookieStore.get("token");
    if (authToken?.value) {
      const key = process.env.NEXT_PUBLIC_SECRET_KEY as string;
      const decoded: any = jwt.verify(authToken?.value, key);
      const updateduser = await userService.updateUser(body, decoded.userId);

      if (!updateduser) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 400,
        });
      }

      return new NextResponse(
        JSON.stringify({ message: "User is updated", data: updateduser }),
        { status: 200 }
      );
    }
  } catch (error: any) {
    return new NextResponse("Error in updating user:" + error.message, {
      status: 500,
    });
  }
};
