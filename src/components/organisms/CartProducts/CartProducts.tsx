"use client";

import { Button } from "@/components/ui/button";
import { checkQuantity, formatPrice } from "@/lib/utils";
import { TPutCart } from "@/utils/schemas/cartSchemas";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartProductProps {
  image: string;
  quantity: number;
  price: number;
  title: string;
  productQuantity: number;
  updateCart: (updateCart: TPutCart) => void;
  removeCart: () => void;
}

export default function CartProducts({
  image,
  quantity,
  price,
  title,
  productQuantity,
  updateCart,
  removeCart,
}: CartProductProps) {
  const [newQuantity, setNewQuantity] = useState(quantity);

  //function update quantity
  const handleUpdateQuantity = (quantity: number) => {
    setNewQuantity(quantity);
    updateCart({ quantity });
  };

  //function remove quantity
  const handleRemoveCart = () => {
    removeCart();
  };

  return (
    <div className='w-full h-fit my-4'>
      <div className='w-full flex rounded-xl border border-black p-2'>
        <Image src={image} alt='product' width={90} height={90} />
        <div className='flex justify-between w-full items-center p-2'>
          <div className='flex flex-col size-[80%] items-start justify-center gap-y-2'>
            <h1 className='text-4xl'>{title}</h1>
            <p>{formatPrice(price)}</p>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <div className='bg-white justify-between flex items-center border border-black rounded-md p-1'>
              <Button
                variant='transparant'
                size='xs'
                className='flex items-center justify-center h-full text-black'
                onClick={() => handleUpdateQuantity(newQuantity - 1)}
                disabled={newQuantity <= 1}
              >
                <Minus className='h-[80%] w-[80%]' />
              </Button>
              <input
                type='number'
                className=' placeholder:leading-loose text-black w-[30%] h-full font-mono  placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none'
                placeholder='0'
                value={newQuantity}
                min={1}
                max={100}
              />
              <Button
                variant='transparant'
                size='xs'
                className='flex items-center justify-center h-full text-black'
                onClick={() => handleUpdateQuantity(newQuantity + 1)}
                disabled={!!checkQuantity(productQuantity, newQuantity + 1)}
              >
                <Plus className='h-[80%] w-[80%]' />
              </Button>
            </div>
            <Button
              variant='transparant'
              size='xs'
              className='flex items-center justify-center h-full text-black'
              onClick={handleRemoveCart}
            >
              <Trash2 className='h-[80%] w-[80%] hover:text-red-500' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
