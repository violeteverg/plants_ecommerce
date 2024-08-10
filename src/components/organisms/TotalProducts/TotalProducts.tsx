"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatPrice, getSessionStorageItem } from "@/lib/utils";
import { TotalSummary } from "@/utils/schemas/productSchemas";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMainStore } from "@/utils/providers/storeProvider";
import useSnap from "@/hooks/useSnap";

interface TotalProductProps {
  totalSummary: TotalSummary;
  isPayment?: boolean;
}

export default function TotalProducts({
  totalSummary,
  isPayment,
}: TotalProductProps) {
  const router = useRouter();
  const [isSnapVisible, setSnapVisible] = useState(false);
  const { snapEmbed } = useSnap();

  const handleBuyButton = async () => {
    if (!isPayment) {
      getSessionStorageItem("__Ttemp", true);
      router.push("/cart/payment");
    } else {
      try {
        const response = await fetch(
          "http://localhost:3007/midtrans/transaction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: "test-99997777",
              amount: totalSummary.totalPrice,
            }),
          }
        );

        const data = await response.json();

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
          console.error("Error fetching Snap token:", data.errors);
        }
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
