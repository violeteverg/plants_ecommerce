import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TotalSummary, CartItem } from "@/utils/schemas/productSchemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  option: {
    currency?: "USD" | "IDR" | "JPY" | "CN";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "compact" } = option;

  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function calculateTotalSummary(cartItems: CartItem[]): TotalSummary {
  return cartItems.reduce(
    (acc: TotalSummary, item: CartItem) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.quantity * item.product.price;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
}
