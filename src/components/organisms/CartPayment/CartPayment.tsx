"use client";

import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface cartPaymentProps {
  image: string;
  quantity: number;
  price: number;
  title: string;
}

export default function CartPayment({
  image,
  quantity,
  price,
  title,
}: cartPaymentProps) {
  return (
    <div className='w-full h-fit my-4'>
      <div className='w-full flex rounded-xl border border-black p-2'>
        <Image src={image} alt='product' width={100} height={100} />
        <div className='flex justify-between w-full items-center p-2'>
          <div className='flex flex-col size-[80%] items-start justify-center gap-y-2'>
            <h1 className='text-4xl'>{title}</h1>
          </div>
          <div className='flex w-[20vh]'>
            <div className='bg-white w-full justify-center gap-3 flex items-center p-1'>
              <p>{quantity}</p>
              <p>x</p>
              <p>{formatPrice(price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
