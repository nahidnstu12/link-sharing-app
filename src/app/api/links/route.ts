import { resolveService } from "@/backend/services/base.service";
import LinkService from "@/backend/services/link.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const linkService = await resolveService(LinkService);

  const userId = request.nextUrl.searchParams.get("user_id");
  console.log("link list", userId);

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  

  const links = await linkService.linkList(userId);

  return NextResponse.json({items: links}, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const linkService = await resolveService(LinkService);

  const body = await request.json();

  const link = await linkService.createLink(body);
  console.log("create link>>", link);

  return NextResponse.json(
    { message: "Link created Successfully!" },
    { status: 200 }
  );
};
