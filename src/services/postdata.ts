import { API_URL } from "@/utils/constant/constant";
import { TPostCart, TPutCart } from "@/utils/schemas/cartSchemas";
import { PaymentSchemas } from "@/utils/schemas/paymentSchems";

export const addCart = async (data: TPostCart) => {
  try {
    const res = await fetch(`${API_URL}/cart`, {
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
    return result;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const editCart = async (id: number, updateCart: TPutCart) => {
  try {
    const res = await fetch(`${API_URL}/cart/${id}`, {
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
    throw error;
  }
};

export const deleteCart = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/cart/${id}`, {
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

// postPayment function
export const postPayment = async (body: PaymentSchemas) => {
  try {
    const res = await fetch(`${API_URL}/midtrans/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`API Error: ${errorData.message}`);
    }

    return res.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
