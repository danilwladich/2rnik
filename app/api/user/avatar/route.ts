import type { NextRequest } from "next/server";
import { changeAvatarSchema } from "@/lib/form-schema";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { parseJsonFromFormData } from "@/lib/formdata-parser";
import { deleteImage, uploadImage } from "@/lib/upload-image";
import { updateUser } from "@/services/user";

export async function PATCH(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const data = parseJsonFromFormData(await req.formData());
    const body = changeAvatarSchema.safeParse(data);

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { image } = body.data as { image: File };

    const authUser = getAuthUser();

    // Checking if the user has an existing avatar image
    if (authUser.avatar) {
      // Deleting the old avatar
      await deleteImage(authUser.avatar);
    }

    // Saving the new avatar image
    const avatarUrl = await uploadImage(image, "avatar");

    // Updating the user's avatar
    const user = await updateUser(authUser.id, { avatar: avatarUrl });

    // Returning a JSON response with user information
    return jsonResponse(user, 201);
  } catch (error) {
    // Handling internal error
    console.log("[USER_AVATAR_PATCH]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = getAuthUser();

    // Checking if the user has an existing avatar image
    if (authUser.avatar) {
      // Deleting the old avatar
      await deleteImage(authUser.avatar);
    }

    // Updating the user's avatar
    const user = await updateUser(authUser.id, { avatar: null });

    // Returning a JSON response with user information
    return jsonResponse(user, 200);
  } catch (error) {
    // Handling internal error
    console.log("[USER_AVATAR_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}
