"use client";

import CartProducts from "@/components/organisms/CartProducts/CartProducts";
import LoadingCartPages from "@/components/organisms/Loading/LoadingCartPages";
import TotalProducts from "@/components/organisms/TotalProducts/TotalProducts";
import WidthWrapper from "@/components/WidthWrapper";
import { useRemoveCart } from "@/hooks/useRemoveCart";
import { useUpdateCart } from "@/hooks/useUpdateCart";
import { calculateTotalSummary } from "@/lib/utils";
import { getCartData } from "@/services/getdata";
import { TPutCart } from "@/utils/schemas/cartSchemas";
import { CartItem, TotalSummary } from "@/utils/schemas/productSchemas";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function CartPages() {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery<CartItem[]>({
    queryKey: ["CARTITEMS"],
    queryFn: getCartData,
  });
  console.log(cartItems);

  //summary total quantity and total price
  const totalSummary: TotalSummary = useMemo(() => {
    return cartItems
      ? calculateTotalSummary(cartItems)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [cartItems]);

  const { updateCart } = useUpdateCart({
    onSuccess: (data) => {
      console.log("Cart item updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating cart item:", error);
    },
  });

  const { removeCart } = useRemoveCart({
    onSuccess: (data) => {
      console.log("Cart item successfully removed:", data);
    },
    onError: (error) => {
      console.error("Cant remove Cart:", error);
    },
  });

  return (
    <>
      <WidthWrapper className='flex justify-center items-center h-screen '>
        <div className='flex w-[80%] border rounded-lg border-black'>
          <div className='w-[70%] flex flex-col justify-center h-full items-start'>
            <h1 className='p-2 text-lg'>My Cart</h1>
            <div className='w-full flex flex-col px-2 h-[70vh] items-center overflow-y-auto my-2'>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <LoadingCartPages key={i} />
                  ))
                : cartItems?.map((items, index) => (
                    <CartProducts
                      key={index}
                      title={items.product.title}
                      quantity={items.quantity}
                      image={items.product.image}
                      price={items.product.price}
                      productQuantity={items.product.quantity}
                      updateCart={(update: TPutCart) =>
                        updateCart({ cartId: items.id, updateCart: update })
                      }
                      removeCart={() => removeCart(items.id)}
                    />
                  ))}
            </div>
          </div>
          <div className='w-[30%] p-4'>
            <TotalProducts totalSummary={totalSummary} />
          </div>
        </div>
      </WidthWrapper>
    </>
  );
}
