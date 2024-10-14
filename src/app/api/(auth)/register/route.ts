import AuthService from "@/backend/services/auth.service";
import { resolveService } from "@/backend/services/base.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const authService = await resolveService(AuthService);
    const body = await request.json();

    const user = await authService.registerUser(body);

    if (user?.status && user.status > 201) {
      return NextResponse.json(
        { message: user.message },
        { status: user.status }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
};
