import axios from "axios";
import { TCreateUser, TLoginUser } from "@/utils/schemas/authSchemas";

export const createUser = async (data: TCreateUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3007/auth/register",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw new Error("failed to send data");
  }
};
