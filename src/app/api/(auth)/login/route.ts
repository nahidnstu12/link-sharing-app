import AuthService from "@/backend/services/auth.service";
import { resolveService } from "@/backend/services/base.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const authService = await resolveService(AuthService);

    const body = await request.json();

    const user = await authService.loginUser(body);

    if (user?.status && user.status > 201) {
      return NextResponse.json(
        { message: user.message },
        { status: user.status }
      );
    }
    console.log("user?.data?.token", user?.data?.token);

    const response = NextResponse.json(user, {
      status: 200,
    });
    response.cookies.set("token", user?.data?.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    // response.cookies.set("userId", user.data?.userId, {
    //   httpOnly: false,
    //   secure: true,
    //   path: "/",
    //   sameSite: "strict",
    // });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
