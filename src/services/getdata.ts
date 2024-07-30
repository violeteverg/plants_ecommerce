import axios from "axios";
import { CartItem, product, response } from "@/utils/schemas/productSchemas";

export const getAllProduct = async (): Promise<response> => {
  try {
    const res = await axios.get<response>("http://localhost:3007/product");
    console.log("test");
    console.log(res.data.data);
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
    console.log("test");
    console.log(res.data);
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
    console.log("test");
    console.log(res.data);
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
    console.log("test");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
export const getProductId = async (id: number) => {
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
