"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetFooter,
} from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import { calculateTotalSummary, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import CartItems from "../CartItems/CartItems";
import { useQuery } from "@tanstack/react-query";
import { getCartData } from "@/services/getdata";
import { CartItem, TotalSummary } from "@/utils/schemas/productSchemas";
import LoadingCartItems from "../Loading/LoadingCartItems";
import { useUpdateCart } from "@/hooks/useUpdateCart";
import { TPutCart } from "@/utils/schemas/cartSchemas";
import { useRemoveCart } from "@/hooks/useRemoveCart";

export default function Cart() {
  const fee = 2;
  const { data: cartItems, isLoading } = useQuery<CartItem[]>({
    queryKey: ["CARTITEMS"],
    queryFn: getCartData,
  });

  const isCart: number = cartItems?.length ?? 0;

  const { totalPrice }: TotalSummary = useMemo(() => {
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
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart className={`h-6 w-6 flex-shrink-0`} />
        <span className='ml-2 text-sm font-medium text-white group-hover:text-gray-800'>
          {isCart}
        </span>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col pr-2 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>{`Cart ${isCart}`}</SheetTitle>
        </SheetHeader>
        {isCart > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6 space-y-4'>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <LoadingCartItems key={i} />
                  ))
                : cartItems?.map((item) => (
                    <CartItems
                      key={item.id}
                      image={item.product.image}
                      quantity={item.quantity}
                      title={item.product.title}
                      latinName={item.product.latinName}
                      productQuantity={item.product.quantity}
                      updateCart={(update: TPutCart) =>
                        updateCart({ cartId: item.id, updateCart: update })
                      }
                      removeCart={() => removeCart(item.id)}
                    />
                  ))}
            </div>
            <div className='space-y-4 text-sm'>
              <Separator />
              <div className='space-y-1.5 pr-6'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  href='/cart'
                  className={buttonVariants({ className: "w-full" })}
                >
                  Checkout
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-96 w-96 text-muted-foreground'>
              <Image src='/Tiger-Cart.png' fill alt='tiger with a cart' />
            </div>
            <span className='text-gray-700 font-medium text-2xl'>
              This Cart is empty
            </span>
            <SheetTrigger asChild>
              <Link
                href='/product'
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
