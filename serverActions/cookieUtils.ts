// utils/tokenUtils.ts

import Cookies from "js-cookie";

export const setTokenClient = (token: string) => {
  Cookies.set("token", token, { expires: 1, secure: true, sameSite: "Strict" });
};

export const getTokenClient = () => {
  return Cookies.get("token");
};

export const removeTokenClient = () => {
  Cookies.remove("token");
};

export const setRefreshTokenClient = (refreshToken: string) => {
  Cookies.set("refreshToken", refreshToken, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
};

export const getRefreshTokenClient = () => {
  return Cookies.get("refreshToken");
};

export const removeRefreshTokenClient = () => {
  Cookies.remove("refreshToken");
};
