import axios from "axios";
import {
  CartItem,
  productResponse,
  response,
  responses,
} from "@/utils/schemas/productSchemas";
import { API_URL } from "@/utils/constant/constant";

export const getAllProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(`${API_URL}/product`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getCactusProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(`${API_URL}/product/category/cactus`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPlantsProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(`${API_URL}/product/category/plants`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getSucculentsProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(
      `${API_URL}/product/category/succulents`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPotsProduct = async (): Promise<responses> => {
  try {
    const res = await fetch(`${API_URL}/product/category/pots`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getGrowingMediaProduct = async (): Promise<responses> => {
  try {
    const res = await fetch(`${API_URL}/product/category/growing-media`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getProductId = async (id: number): Promise<productResponse> => {
  try {
    const res = await axios.get(`${API_URL}/product/${id}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getCartData = async (): Promise<CartItem[]> => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    return data.data;
  } catch (error) {
    throw error;
  }
};
