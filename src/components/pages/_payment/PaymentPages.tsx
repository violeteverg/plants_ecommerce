"use client";

import AddressCard from "@/components/organisms/AddressCard/AddressCard";
import Navbar from "@/components/organisms/Navbar/Navbar";
import TotalProducts from "@/components/organisms/TotalProducts/TotalProducts";
import CartPayment from "@/components/organisms/CartPayment/CartPayment";
import WidthWrapper from "@/components/WidthWrapper";
import { useQuery } from "@tanstack/react-query";
import {
  CartItem,
  productResponse,
  TotalSummary,
} from "@/utils/schemas/productSchemas";
import { getCartData, getProductId } from "@/services/getdata";
import { useEffect, useMemo, useState } from "react";
import {
  calculateTotalSummary,
  calculateTotalSummaryFromBuyNow,
  getSessionStorageItem,
} from "@/lib/utils";
import { useMainStore } from "@/utils/providers/storeProvider";

export default function PaymentPages() {
  const { count } = useMainStore((state) => ({
    count: state.count,
  }));
  const getSessionData = getSessionStorageItem("__Ttemp", false);
  const isBuyNow = getSessionData?.isBuyNow;

  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["CARTITEMS"],
    queryFn: getCartData,
  });

  const { data: dataProduct } = useQuery<productResponse | null>({
    queryKey: ["PRODUCTID"],
    queryFn: () => getProductId(getSessionData?.productId),
  });

  const updateProductQuantity = useMemo(() => {
    if (dataProduct) {
      const data = dataProduct?.map((item: any) => ({
        ...item,
        quantity: count,
      }));
      return data;
    }
    return [];
  }, [dataProduct, count]);

  const totalSummary: TotalSummary = useMemo(() => {
    if (isBuyNow) {
      return calculateTotalSummaryFromBuyNow(updateProductQuantity);
    }
    return cartItems
      ? calculateTotalSummary(cartItems)
      : { totalPrice: 0, totalQuantity: 0 };
  }, [cartItems, updateProductQuantity, isBuyNow]);

  const dataPayment = () => {
    if (isBuyNow) {
      const data = updateProductQuantity?.map((item: any, i: number) => (
        <CartPayment
          key={i}
          title={item.title}
          quantity={item.quantity}
          image={item.image}
          price={item.price}
        />
      ));
      return data;
    }

    return cartItems?.map((items: any, index: number) => (
      <CartPayment
        key={index}
        title={items.product.title}
        quantity={items.quantity}
        image={items.product.image}
        price={items.product.price}
      />
    ));
  };

  return (
    <>
      <WidthWrapper className='flex justify-center items-center h-screen '>
        <div className='flex w-[80%] '>
          <div className='w-[70%] flex flex-col justify-center h-full items-center'>
            <AddressCard />
            <div className='w-full flex flex-col p-4 h-[50vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
              {dataPayment()}
            </div>
          </div>
          <div className='w-[30%] p-4'>
            <TotalProducts totalSummary={totalSummary} isPayment={true} />
          </div>
        </div>
      </WidthWrapper>
    </>
  );
}
