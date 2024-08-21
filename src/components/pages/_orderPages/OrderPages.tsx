"use client";

import WidthWrapper from "@/components/WidthWrapper";
import { Button } from "@/components/ui/button";
import { getOrderStatus } from "@/services/getdata";
import { TransactionResponse } from "@/utils/schemas/orderSchemas";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderPages() {
  const params = useSearchParams();
  const getParams = params.get("order_id")!;

  const router = useRouter();
  const { data } = useQuery<TransactionResponse | undefined>({
    queryKey: ["ORDER_DATA"],
    queryFn: () => getOrderStatus(getParams),
  });

  const buttonHandler = () => {
    router.push("/product");
  };
  return (
    <WidthWrapper className='flex justify-center h-full pb-4'>
      <div className='w-[50vw] border rounded-md border-black h-full '>
        <div className='flex flex-col justify-center items-center px-2 py-4'>
          <Image
            src={"/success_icon.svg"}
            alt='success'
            width={250}
            height={250}
            className='mt-4'
          />
          <div className='flex flex-col items-center my-6 gap-2'>
            <h1 className='text-6xl text-green-400'>sukses</h1>
            <p className='text-3xl'>{data?.order_id}</p>
          </div>
          <div className='w-full grid grid-cols-2 px-4 py-2'>
            <div>
              <p>Status</p>
              <p>Tanggal Pesanan</p>
              <p>Jenis Pembayaran</p>
              <p>Total Amount</p>
            </div>
            <div className='text-right'>
              <p> Success</p>
              <p>{` ${data?.transaction_time}`}</p>
              <p>{` ${data?.va_numbers[0].bank}`}</p>
              <p>{` ${data?.gross_amount}`}</p>
            </div>
          </div>
          <Button className='w-full mt-2' onClick={buttonHandler}>
            <p>back to product</p>
          </Button>
        </div>
      </div>
    </WidthWrapper>
  );
}
