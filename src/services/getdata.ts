import axios from "axios";
import {
  CartItem,
  productResponse,
  response,
  responses,
} from "@/utils/schemas/productSchemas";
import { API_URL } from "@/utils/constant/constant";
import { TransactionResponse } from "@/utils/schemas/orderSchemas";

export const getAllProduct = async (page: number): Promise<response> => {
  try {
    const res = await axios.get<response>(`${API_URL}/product?page=${page}`);

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getSearchProduct = async (
  query: string,
  page: number
): Promise<responses> => {
  try {
    const res = await fetch(
      `${API_URL}/product/search?query=${query}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};
export const getCactusProduct = async (page: number): Promise<response> => {
  try {
    const res = await axios.get<response>(
      `${API_URL}/product/category/cactus?page=${page}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPlantsProduct = async (page: number): Promise<response> => {
  try {
    const res = await axios.get<response>(
      `${API_URL}/product/category/plants?page=${page}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getSucculentsProduct = async (page: number): Promise<response> => {
  try {
    const res = await axios.get<response>(
      `${API_URL}/product/category/succulents?page=${page}`
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPotsProduct = async (page: number): Promise<responses> => {
  try {
    const res = await fetch(`${API_URL}/product/category/pots?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getGrowingMediaProduct = async (
  page: number
): Promise<responses> => {
  try {
    const res = await fetch(
      `${API_URL}/product/category/growing-media?page=${page}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
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
export const getOrderStatus = async (
  id: string
): Promise<TransactionResponse | undefined> => {
  try {
    const res = await fetch(`${API_URL}/midtrans/verify/${id}`, {
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
