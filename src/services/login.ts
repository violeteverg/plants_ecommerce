import axios from "axios";
import { TCreateUser, TLoginUser } from "@/utils/schemas/authSchemas";
import { API_URL } from "@/utils/constant/constant";

export const createUser = async (data: TCreateUser) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("failed to send data");
  }
};

export const loginUser = async (data: TLoginUser) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("failed to send data");
  }
};
