import { resolveService } from "@/backend/services/base.service";
import UserService from "@/backend/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userService = await resolveService(UserService);

    // Authenticate the user
    const user = await userService.getAuthenticatedUser();

    // Convert file to buffer (binary data)
    const bufferImage = Buffer.from(await file.arrayBuffer());
    const base64Image = bufferImage.toString("base64");
    const imageType = file.type;

    console.log("imageType", imageType);

    user.photo_path = base64Image;
    user.photo_type = imageType;
    await user.save();

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "File upload error",
      },
      { status: 400 }
    );
  }
};
