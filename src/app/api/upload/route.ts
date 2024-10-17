import { resolveService } from "@/backend/services/base.service";
import UserService from "@/backend/services/user.service";
import console from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    const userService = await resolveService(UserService);

    // Authenticate the user
    const user = await userService.getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!file) {
      return NextResponse.json({ success: false, message: "No file attached" });
    }

    // Delete the old file if it exists
    await userService.deleteOldFile(user.photo_path);

    // Upload new file and update user profile
    const newFilePath = await userService.uploadNewFile(
      file,
      user._id.toString()
    );
    user.photo_path = newFilePath;
    await user.save();

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json({
      success: false,
      message: "File upload error",
    });
  }
};
