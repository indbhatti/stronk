"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Server-side cookie utils

export interface UserJwtPayload extends jwt.JwtPayload {
  username: string;
  email: string;
  accessLevel: number;
}

/*
export const setTokenServer = async (token: string) => {
  const cookieStore = cookies();
  (await cookieStore).set("token", token);
};


export const setRefreshTokenServer = async (refreshToken: string) => {
  const cookieStore = cookies();
  (await cookieStore).set("refreshToken", refreshToken);
};
*/

export const getTokenServer = async () => {
  const cookieStore = cookies();
  return (await cookieStore).get("token");
};

export const removeTokenServer = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete("token");
};

export const getRefreshTokenServer = async () => {
  const cookieStore = cookies();
  return (await cookieStore).get("refreshToken");
};

export const removeRefreshTokenServer = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete("refreshToken");
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
