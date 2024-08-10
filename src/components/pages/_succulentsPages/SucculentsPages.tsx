"use client";

import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import { getSucculentsProduct } from "@/services/getdata";
import { response } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/organisms/Loading/Loading";
import Image from "next/image";

export default function SucculentsPages() {
  const { data, isLoading, isError } = useQuery<response>({
    queryKey: ["SUCCULENTS"],
    queryFn: getSucculentsProduct,
  });

  const numPlaceholders = data?.data.length || 5;
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='flex flex-col items-center'>
        <div className='relative w-full h-[300px] mb-4'>
          <Image
            src='/bgProduct/bg-succulents-product.jpg'
            alt='Succulents Background'
            layout='fill'
            objectFit='cover'
            className='group'
          />
          <div className='absolute inset-0 flex items-end justify-start w-full bg-black bg-opacity-20'>
            <div className='bg-black bg-opacity-40 p-4 h-full flex items-end w-[40%] rounded-tr-full'>
              <div className='text-[60px] text-white font-medium m-2 leading-[0.9] drop-shadow-lg'>
                <p>
                  Find your
                  <span className='block font-extrabold drop-shadow-xl text-[#beff7e]'>
                    Succulents
                  </span>
                  here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-[5px] mb-2 border overflow-hidden'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 m-2'>
            {isLoading
              ? Array.from({ length: numPlaceholders }).map((_, i) => (
                  <Loading key={i} />
                ))
              : data?.data.map((item) => (
                  <CardProducts
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
