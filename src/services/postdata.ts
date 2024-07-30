import { TPostCart, TPutCart } from "@/utils/schemas/cartSchemas";

export const addCart = async (data: TPostCart) => {
  try {
    const res = await fetch("http://localhost:3007/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to add to cart");
    }

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const editCart = async (id: number, updateCart: TPutCart) => {
  try {
    const res = await fetch(`http://localhost:3007/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updateCart),
    });

    if (!res.ok) {
      const errorUpdate = await res.json();
      throw new Error(errorUpdate.message || " failed to update Cart");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("this is error", error);
    throw error;
  }
};

export const deleteCart = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3007/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to delete cart item");
    }
    return res.json();
  } catch (error) {
    throw new Error("gagal apus pokok e");
  }
};
