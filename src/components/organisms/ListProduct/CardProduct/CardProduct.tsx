"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CardProductProps {
  title: string;
  image: string;
  link: string;
}

export default function CardProduct({ title, image, link }: CardProductProps) {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(link);
  };

  return (
    <div className='w-[35vw] h-fit mx-2 text-white justify-center items-center'>
      <div className='bg-[#bdc3c7] rounded-xl m-3 p-3 flex flex-col items-center'>
        <h1 className='text-4xl mt-4'>{title}</h1>
        <hr className='w-[200px] my-2' />
        <Button variant={"secondary"} className='mt-4' onClick={onClickHandler}>
          <span> Shop Collection </span>
        </Button>
        <Image src={image} alt='plant' width={300} height={300} />
      </div>
    </div>
  );
}
