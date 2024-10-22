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
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to login");
  }
};

// export const loginUser = async (data: TLoginUser) => {
//   try {
//     const response = await axios.post(`${API_URL}/auth/login`, data, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error("failed to send data");
//   }
// };
