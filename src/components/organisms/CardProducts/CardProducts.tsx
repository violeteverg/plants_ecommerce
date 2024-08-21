"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useMainStore } from "@/utils/providers/storeProvider";
import { useRouter } from "next/navigation";

interface CardProductsProps {
  id: number;
  title: string;
  price: string | number;
  image: string;
  additional?: number;
  discount?: boolean | null;
}

const CardProducts = ({
  id,
  title,
  price,
  image,
  discount,
  additional,
}: CardProductsProps) => {
  const router = useRouter();
  const { setProductId } = useMainStore((state) => ({
    setProductId: state.setProductId,
  }));
  const priceNumber = typeof price === "string" ? parseFloat(price) : price;
  const totalDiskon =
    discount && additional ? (priceNumber * additional) / 100 : 0;
  const finalPrice = priceNumber - totalDiskon;
  const HargaFixBanget = parseFloat(finalPrice.toFixed(3));

  const cardClickHandler = (id: number) => {
    setProductId(id);
    router.push(`/detail?productId=${id}`);
  };

  return (
    <div className='w-[16vw] h-fit text-black justify-center items-center'>
      <div
        className='bg-[#ffffff] hover:bg-[#faf9f9] border border-[#f1eded] hover:scale-[105%] duration-300 p-3 flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-[#000000] hover:border-opacity-20 group'
        onClick={() => cardClickHandler(id)}
      >
        <div className='flex items-center justify-between w-full mb-3'>
          {discount && (
            <div className='group relative gap-1 flex text-[12px] font-[600] bg-[#ec4040] text-white px-4 py-1 rounded-md ease-in-out duration-200 group-hover:px-10'>
              <p>{`${additional}%`}</p>
            </div>
          )}
          <div className='flex-grow' />
          <div className='bg-slate-500 p-5 w-4 h-4 rounded-full opacity-10' />
        </div>
        <div className='flex flex-col justify-center items-center w-full duration-10'>
          <Image src={image} alt='plant' width={150} height={200} />
          <hr className='w-6/12 my-2 transition-all duration-300 border border-y-1 border-[#e7e7e7]  ease-in-out group-hover:w-full group-hover:border-[#aeaeae]' />
        </div>
        {discount ? (
          <div className='flex flex-col justify-start items-start w-full group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
            <h1 className='text-[16px] font-[400]  text-[#454545]'>{title}</h1>
            <div className='flex gap-3 justify-between'>
              <p className='text-xl font-[800] font-serif '>
                {formatPrice(HargaFixBanget)}
              </p>
              <p className='text-sm font-[800] opacity-50 font-serif line-through pt-1'>
                {formatPrice(price)}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-start items-start w-full group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
            <h1 className='text-[16px] font-[400]  text-[#454545]'>{title}</h1>
            <p className='text-xl font-[800] font-serif'>
              {formatPrice(price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProducts;
