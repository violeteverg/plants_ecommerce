"use client";

import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Layout from "@/components/templates/Layout";
import { DummyCactusProducts } from "@/lib/mock/DummyProduct";
import Image from "next/image";

export default function GrowingMediaPages() {
  return (
    <Layout>
      <div className='flex-1 overflow-y-auto'>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-full relative h-[300px] mb-4 group'>
            <Image
              src={"/bgProduct/bg-growing_media-product.jpeg"}
              alt='cactus-bg'
              layout='fill'
              objectFit='cover'
            />
            <div className='relative inset-0 items-end justify-start flex w-full bg-black bg-opacity-20 h-full'>
              <div className='bg-black bg-opacity-40 p-[1%] h-full flex items-end w-[40%] rounded-tr-full'>
                <div className='text-[60px] text-white font-[500] m-2 leading-[0.9] drop-shadow-lg'>
                  <p>
                    Find your
                    <span className='block font-[800] drop-shadow-xl relative text-[#beff7e]'>
                      Growing Media
                    </span>
                    here
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='rounded-[5px] mb-2 border overflow-hidden'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2'>
              {DummyCactusProducts.map((item) => {
                return (
                  <CardProducts
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    discount={item.discount}
                    additional={item.additional}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
