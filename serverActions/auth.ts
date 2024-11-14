"use server";

import { IUser } from "@/Types/models";
import { getTokenServer } from "./serverCookieUtils";

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const user: IUser = {
    username,
    email,
    password,
  };
  try {
    const response = await fetch(`${process.env.API_URI}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    if (response.ok) {
      return {
        status: 200,
      };
    }
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}

export async function loginUser(email: string, password: string) {
  const user = { email, password };
  try {
    const response = await fetch(`${process.env.API_URI}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        token: result.token,
        refreshToken: result.refreshToken,
      };
    }
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await fetch(`${process.env.API_URI}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return {
        status: response.status,
        token: result.token,
        refreshToken: result.refreshToken,
      };
    }
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}

export async function testAuth() {
  try {
    const response1 = await fetch(`${process.env.API_URI}/`, {
      method: "GET",
    });
    const result1 = await response1.json();
    console.log(result1.message);
    const response = await fetch(`${process.env.API_URI}/protectedTest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${(await getTokenServer())?.value}`,
      },
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}

export async function forgotPassword(password: string, token: string) {
  try {
    const response = await fetch(`${process.env.API_URI}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });

    const result = await response.json();
    if (response.ok) {
      return {
        status: 200,
      };
    }
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}

export async function forgotPasswordEmail(email: string) {
  try {
    const response = await fetch(
      `${process.env.API_URI}/forgot-password-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      return {
        status: 200,
      };
    }
    const result = await response.json();
    return { status: response.status, message: result.message };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "SERVER ERROR" };
  }
}
