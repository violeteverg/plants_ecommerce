"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice, getSessionStorageItem } from "@/lib/utils";
import { TotalSummary } from "@/utils/schemas/productSchemas";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import useSnap from "@/hooks/useSnap";
import { useMainStore } from "@/utils/providers/storeProvider";
import { useMutation } from "@tanstack/react-query";
import { paymentPayload, PaymentSchemas } from "@/utils/schemas/paymentSchems";
import { postPayment } from "@/services/postdata";

interface TotalProductProps {
  totalSummary: TotalSummary;
  isPayment?: boolean;
  sendBodyPayment: paymentPayload;
}

export default function TotalProducts({
  totalSummary,
  isPayment,
  sendBodyPayment,
}: TotalProductProps) {
  const router = useRouter();
  const { setIsFromCart } = useMainStore((state) => ({
    setIsFromCart: state.setIsFromCart,
  }));
  const [isSnapVisible, setSnapVisible] = useState(false);

  const { snapEmbed } = useSnap();
  const { mutate } = useMutation({
    mutationFn: (body: PaymentSchemas) => postPayment(body),
    onSuccess: (data: { token: string; redirect_url: string }) => {
      console.log("Success response:", data);
      if (data.token) {
        setSnapVisible(true);
        snapEmbed(data.token, "snap-container", {
          onSuccess: function (result: any) {
            console.log("onSuccess", result);
            setSnapVisible(false);
          },
          onPending: function (result: any) {
            console.log("onPending", result);
            setSnapVisible(false);
          },
          onClose: function (result: any) {
            console.log("onClose", result);
            setSnapVisible(false);
          },
        });
      } else {
        console.error("Error: No token found in response");
      }
    },
    onError: (error: any) => {
      console.error("Error:", error.message);
    },
  });

  const paymentPayload = useMemo(
    () => ({
      amount: totalSummary.totalPrice,
      products: sendBodyPayment,
    }),
    [sendBodyPayment, totalSummary]
  );

  console.log(paymentPayload);

  const handleBuyButton = async () => {
    if (!isPayment) {
      getSessionStorageItem("__Ttemp", true);
      setIsFromCart(true);
      router.push("/cart/payment");
    } else {
      try {
        mutate(paymentPayload);
      } catch (error) {
        console.error("Error in handleBuyButton:", error);
      }
    }
  };

  return (
    <>
      {!isSnapVisible && (
        <div className='w-full h-[45%] border border-black rounded-lg'>
          <div className='flex flex-col justify-center items-start p-6 space-y-8'>
            <h1 className='font-bold text-lg left-0'>Shopping Summary</h1>
            <div className='flex w-full justify-between'>
              <p>Total</p>
              <span>{isPayment ? ":" : totalSummary?.totalQuantity}</span>
              <p>{formatPrice(totalSummary?.totalPrice)}</p>
            </div>
            {!isPayment ? (
              <Button
                variant='default'
                size='lg'
                className='w-full'
                onClick={handleBuyButton}
              >
                Buy
              </Button>
            ) : (
              <Button onClick={handleBuyButton}>
                <CreditCard className='mr-2' />
                <p>Payment</p>
              </Button>
            )}
          </div>
        </div>
      )}
      <div>
        <div id='snap-container'></div>
      </div>
    </>
  );
}
