export type category = {
  id: number;
  categoryName: string;
};
export type product = {
  id: number;
  categoryId: number;
  discountId: number | null;
  title: string;
  latinName: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category: category;
  discount: number | null;
};
export type pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};
export type responses = {
  code: number;
  status: string;
  message: string;
  data: Array<Product>;
  pagination: pagination;
};
export type response = {
  data: Array<product>;
  pagination: pagination;
};
export type productResponse = Array<product>;
// Definisikan tipe untuk Product
export type Product = {
  id: number;
  categoryId: number;
  discountId: number | null;
  title: string;
  latinName: string | null;
  image: string;
  description: string;
  price: number;
  quantity: number;
};

// Definisikan tipe untuk CartItem
export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
};

// Definisikan tipe untuk respons API
export type CartResponse = {
  code: number;
  status: string;
  message: string;
  data: CartItem[];
};

export type TotalSummary = {
  totalQuantity: number;
  totalPrice: number;
};
