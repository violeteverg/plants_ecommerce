import axios from "axios";
import {
  TCreateUser,
  TLoginUser,
  TResponseCreate,
} from "@/utils/schemas/authSchemas";
import { cookies } from "next/headers";

export const createUser = async (data: TCreateUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3007/auth/register",
      data,
      { withCredentials: true }
    );
    console.log("login", response.data);
    return response.data;
  } catch (error) {
    // console.log(error);
    throw new Error("failed to send data");
  }
};

export const loginUser = async (data: TLoginUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3007/auth/login",
      data,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("failed to send data");
  }
};
