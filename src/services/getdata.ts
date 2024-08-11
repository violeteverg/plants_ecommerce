import axios from "axios";
import {
  CartItem,
  productResponse,
  response,
  responses,
} from "@/utils/schemas/productSchemas";

export const getAllProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>("http://localhost:3007/product");

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getCactusProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(
      "http://localhost:3007/product/category/cactus"
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPlantsProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(
      "http://localhost:3007/product/category/plants"
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getSucculentsProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>(
      "http://localhost:3007/product/category/succulents"
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getPotsProduct = async (): Promise<responses> => {
  try {
    const res = await fetch("http://localhost:3007/product/category/pots", {
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
    const res = await fetch(
      "http://localhost:3007/product/category/growing-media",
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
    const res = await axios.get(`http://localhost:3007/product/${id}`);
    const data = res.data.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getCartData = async (): Promise<CartItem[]> => {
  try {
    const res = await fetch("http://localhost:3007/cart", {
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
