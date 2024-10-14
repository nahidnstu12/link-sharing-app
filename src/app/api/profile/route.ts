import { resolveService } from "@/backend/services/base.service";
import UserService from "@/backend/services/user.service";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  //
  const cookieStore = cookies();
  const authToken = cookieStore.get("token");
  if (authToken?.value) {
    const key = process.env.NEXT_PUBLIC_SECRET_KEY as string;
    const decoded: any = jwt.verify(authToken?.value, key);

    if (decoded.email && decoded.userId) {
      const userService = await resolveService(UserService);
      const profileData = await userService.fetchProfile({
        email: decoded.email,
        userId: decoded.userId,
      });
      return NextResponse.json(profileData, { status: 200 });
    }
  } else {
    return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
  }
};
