"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { TotalSummary } from "@/utils/schemas/productSchemas";
import { CreditCard } from "lucide-react";
import Link from "next/link";

interface TotalProductProps {
  totalSummary: TotalSummary;
  isPayment?: boolean;
}

export default function TotalProducts({
  totalSummary,
  isPayment,
}: TotalProductProps) {
  return (
    <div className='w-full h-[45%] border border-black rounded-lg'>
      <div className='flex flex-col justify-center items-start p-6 space-y-8'>
        <h1 className='font-bold text-lg left-0'>Shopping Summary</h1>
        <div className='flex w-full justify-between'>
          <p>Total</p>
          <span>{isPayment ? ":" : totalSummary?.totalQuantity}</span>
          <p>{formatPrice(totalSummary?.totalPrice)}</p>
        </div>
        <Button variant='default' size='lg' className='w-full'>
          {!isPayment ? (
            <Link href='/cart/payment'>Buy</Link>
          ) : (
            <>
              <CreditCard className='mr-2' />
              <p>payment</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
