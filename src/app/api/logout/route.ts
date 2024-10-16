import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.json({ message: "Logout Success" }, { status: 200 });
};
