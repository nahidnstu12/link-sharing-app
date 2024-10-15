import { resolveService } from "@/backend/services/base.service";
import LinkService from "@/backend/services/link.service";

import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const roleService = await resolveService(LinkService);
    const link = await roleService.findLink(params.id);
    if (!link) {
      return new NextResponse(JSON.stringify({ message: "Link not found" }), {
        status: 400,
      });
    }

    return new NextResponse(JSON.stringify(link), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching roles:" + error.message, {
      status: 500,
    });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const roleService = await resolveService(LinkService);
    const body = await request.json();

    const updatedRole = await roleService.updateLink(body, params.id);

    if (!updatedRole) {
      return new NextResponse(JSON.stringify({ message: "Link not found" }), {
        status: 400,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Link is updated", data: updatedRole }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating link:" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const roleService = await resolveService(LinkService);
    const link = await roleService.deleteLink(params.id);

    if (!link) {
      return new NextResponse(
        JSON.stringify({ message: "Link not found in the database" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Link is deleted", data: link }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting link:" + error.message, {
      status: 500,
    });
  }
};
