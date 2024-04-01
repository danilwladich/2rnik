import type { NextRequest } from "next/server";
import { registerSchema } from "@/lib/form-schema";
import { verifyCaptcha } from "@/lib/server-actions";
import { jsonResponse } from "@/lib/json-response";
import { serializeJwt } from "@/lib/serialize-jwt";
import { formatUser } from "../../../../lib/format-user";

export async function POST(req: NextRequest) {
  try {
    // Parsing and validating the request body
    const body = registerSchema.safeParse(await req.json());

    // Handling validation errors
    if (!body.success) {
      return jsonResponse("Validation Error", 400);
    }

    const { username, email, password, recaptchaToken } = body.data;

    // Verifying the recaptcha token
    const isRecaptchaCorrect = verifyCaptcha(recaptchaToken);

    // Handling recaptcha verification failure
    if (!isRecaptchaCorrect) {
      return jsonResponse("Antibot system not passed", 400);
    }

    // Checking if a user with the provided email already exists
    const emailAlreadyTaken = await checkEmail(email);

    // Handling existing user with the provided email error
    if (emailAlreadyTaken) {
      return jsonResponse(
        {
          field: "email",
          message: "User with this email already exists",
        },
        400,
      );
    }

    // Checking if the provided username is already taken
    const usernameAlreadyTaken = await checkUsername(username);

    // Handling existing username error
    if (usernameAlreadyTaken) {
      return jsonResponse(
        {
          field: "username",
          message: "Username already taken",
        },
        400,
      );
    }

    // Creating a new user
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      },
    );
    const data = await res.json();

    // Serializing jwt token
    const serialized = serializeJwt(data.jwt);

    // Returning a JSON response with user information and set cookie header
    return jsonResponse(formatUser(data.user), 201, {
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    // Handling internal error
    console.log("[REGISTER_POST]", error);
    return jsonResponse("Internal Error", 500);
  }
}

async function checkEmail(email: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/users?filters[email][$eq]=${email}`,
  );
  const data = await res.json();

  return data.length > 0;
}

async function checkUsername(username: string) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/users?filters[username][$eq]=${username}`,
  );
  const data = await res.json();

  return data.length > 0;
}
