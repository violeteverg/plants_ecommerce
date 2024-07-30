import { createStore } from "zustand/vanilla";

// Initial value
export type StoreState = {
  count: number;
  productId: number;
  cart: {
    id: string;
    title: string;
    price: string;
    picture: string;
    quantity: string;
  }[];
  activePage: string;
  isAuthenticated: boolean;
  isOpen: boolean;
};

// Actions
export type StoreActions = {
  increment: () => void;
  decrement: () => void;
  addCart: (item: {
    id: string;
    title: string;
    price: string;
    picture: string;
    quantity: string;
  }) => void;
  cancelCart: (id: string) => void;
  setActivePage: (page: string) => void;
  setAuthenticated: (status: boolean) => void;
  setProductId: (id: number) => void;
  resetCount: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

export type MainStore = StoreState & StoreActions;

export const defaultInitState: StoreState = {
  count: 1,
  productId: 0,
  cart: [],
  activePage: "/",
  isAuthenticated: false,
  isOpen: false,
};

export const createMainStore = (initState: StoreState = defaultInitState) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    addCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    cancelCart: (id) =>
      set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    setActivePage: (page) => set({ activePage: page }),
    setAuthenticated: (status) => set({ isAuthenticated: status }),
    setProductId: (id) => set({ productId: id }),
    resetCount: () => set({ count: 1 }),
    setIsOpen: (isOpen) => set({ isOpen }),
  }));
};
