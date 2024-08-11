import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  TotalSummary,
  CartItem,
  productResponse,
  product,
} from "@/utils/schemas/productSchemas";

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
export function calculateTotalSummaryFromBuyNow(
  cartItems: productResponse | null
): TotalSummary {
  if (!cartItems) {
    // Jika cartItems adalah null, kembalikan totalSummary kosong
    return { totalQuantity: 0, totalPrice: 0 };
  }

  return cartItems.reduce(
    (acc: TotalSummary, item: product) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.quantity * item.price;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
}

export function checkQuantity(
  productQuantity: number,
  quantity: number
): string | null {
  if (productQuantity < quantity) {
    return `The product only has ${productQuantity} available.`;
  }
  return null;
}

export function setSessionStorage(key: string, value: any, expired: number) {
  const expirationTimestamp = Date.now() + expired * 60 * 1000;
  const item = {
    ...value,
    expired: expirationTimestamp,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getSessionStorageItem(key: string, _isBuyNow: boolean) {
  const itemStr = sessionStorage?.getItem(key);
  if (!itemStr) return null;

  const { index: productId, isBuyNow, expired } = JSON.parse(itemStr);
  if (Date.now() > expired || _isBuyNow) {
    sessionStorage.removeItem(key);
    return _isBuyNow ? { productId, isBuyNow } : null;
  }

  return { productId, isBuyNow };
}
