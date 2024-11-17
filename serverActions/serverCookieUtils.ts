"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { refreshToken } from "./auth";

// Server-side cookie utils
export interface UserJwtPayload extends jwt.JwtPayload {
  username: string;
  email: string;
  accessLevel: number;
}

export const getToken = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return null;
  }
  try {
    const url = `${process.env.API_URI}/user/verify`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    // If access token is expired, refresh the token and retry
    if (response.status === 401) {
      const tokenRefreshed = await refreshToken();
      const newToken = (await getTokenServer())?.value;

      if (tokenRefreshed) {
        // Retry the request with a new token
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: newToken }),
        });
      }
    }
    if (response.ok) {
      return token;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTokenServer = async () => {
  const cookieStore = cookies();
  return (await cookieStore).get("token");
};

export const getRefreshTokenServer = async () => {
  const cookieStore = cookies();
  return (await cookieStore).get("refreshToken");
};

const decodeToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token);
    if (typeof decoded === "string") {
      return null;
    }
    return decoded as UserJwtPayload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const getDecodedServerToken = async () => {
  try {
    const token = await getTokenServer();
    const decodedToken = token ? await decodeToken(token.value) : null;
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("token");
    (await cookies()).delete("refreshToken");
    return true;
  } catch (error) {
    console.error("Failed to remove token:", error);
    return false;
  }
};
