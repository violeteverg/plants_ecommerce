"use client";

import { Button } from "@/components/ui/button";
import { formatPrice, getSessionStorageItem } from "@/lib/utils";
import { TotalSummary } from "@/utils/schemas/productSchemas";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TotalProductProps {
  totalSummary: TotalSummary;
  isPayment?: boolean;
}

export default function TotalProducts({
  totalSummary,
  isPayment,
}: TotalProductProps) {
  const router = useRouter();

  const handleBuyButton = () => {
    if (!isPayment) {
      getSessionStorageItem("__Ttemp", true);
    }
    router.push("/cart/payment");
  };
  return (
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
          <Button>
            <CreditCard className='mr-2' />
            <p>payment</p>
          </Button>
        )}
      </div>
    </div>
  );
}
