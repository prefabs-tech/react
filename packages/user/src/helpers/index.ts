import type { UserType } from "../types";

const USER_KEY = "user";

export const setUserData = (data: UserType) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getUserData = (): null | UserType => {
  const savedUser = localStorage.getItem(USER_KEY);

  return savedUser ? JSON.parse(savedUser) : null;
};

export const removeUserData = () => {
  localStorage.removeItem(USER_KEY);
};
