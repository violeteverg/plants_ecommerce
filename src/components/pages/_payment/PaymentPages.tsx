"use client";

import AddressCard from "@/components/organisms/AddressCard/AddressCard";
import Navbar from "@/components/organisms/Navbar/Navbar";
import TotalProducts from "@/components/organisms/TotalProducts/TotalProducts";
import CartPayment from "@/components/organisms/CartPayment/CartPayment";
import WidthWrapper from "@/components/WidthWrapper";
import { DummyCartProduct } from "@/lib/mock/DummyCartProduct";
import { useQuery } from "@tanstack/react-query";
import { CartItem, TotalSummary } from "@/utils/schemas/productSchemas";
import { getCartData } from "@/services/getdata";
import { useMemo } from "react";
import { calculateTotalSummary } from "@/lib/utils";

export default function PaymentPages() {
  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery<CartItem[]>({
    queryKey: ["CARTITEMS"],
    queryFn: getCartData,
  });
  const totalSummary: TotalSummary = useMemo(() => {
    return cartItems
      ? calculateTotalSummary(cartItems)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [cartItems]);

  return (
    <>
      <Navbar navbarStyle='sticky' />
      <WidthWrapper className='flex justify-center items-center h-screen '>
        <div className='flex w-[80%] '>
          <div className='w-[70%] flex flex-col justify-center h-full items-center'>
            <AddressCard />
            <div className='w-full flex flex-col p-4 h-[50vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
              {cartItems?.map((items, index) => (
                <CartPayment
                  key={index}
                  title={items.product.title}
                  quantity={items.quantity}
                  image={items.product.image}
                  price={items.product.price}
                />
              ))}
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
