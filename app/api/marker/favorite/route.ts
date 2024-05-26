import type { NextRequest } from "next/server";
import { jsonResponse } from "@/lib/json-response";
import { getAuthUser } from "@/lib/get-auth-user";
import { addFavoriteMarker, removeFavoriteMarker } from "@/services/marker";

export async function POST(req: NextRequest) {
  try {
    const { markerId } = await req.json();

    // Check if the marker id is provided
    if (!markerId) {
      return jsonResponse("Marker id required", 400);
    }

    const authUser = getAuthUser();

    // Update the marker
    await addFavoriteMarker(markerId, authUser.id);

    return jsonResponse("Location added to favorites successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_FAVORITE_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { markerId } = await req.json();

    // Check if the marker id is provided
    if (!markerId) {
      return jsonResponse("Marker id required", 400);
    }

    const authUser = getAuthUser();

    // Update the marker
    await removeFavoriteMarker(markerId, authUser.id);

    return jsonResponse("Location removed from favorites successfully", 201);
  } catch (error) {
    // Handling internal error
    console.log("[MARKER_FAVORITE_DELETE]", error);
    return jsonResponse("Internal Error", 500);
  }
}