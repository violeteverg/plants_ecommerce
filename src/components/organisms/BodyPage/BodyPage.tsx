import Image from "next/image";
import { ReactNode } from "react";

interface BodyPagesProps {
  image: string;
  text: string;
  children: ReactNode;
}
export default function Bodypage({ image, text, children }: BodyPagesProps) {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full relative h-[300px] mb-4 group'>
          <Image src={image} alt='cactus-bg' layout='fill' objectFit='cover' />
          <div className='relative inset-0 items-end justify-start flex w-full bg-black bg-opacity-20 h-full'>
            <div className='bg-black bg-opacity-40 p-[1%] h-full flex items-end w-[40%] rounded-tr-full'>
              <div className='text-[60px] text-white font-[500] m-2 leading-[0.9] drop-shadow-lg'>
                <p>
                  Find your
                  <span className='block font-[800] drop-shadow-xl relative text-[#beff7e]'>
                    {text}
                  </span>
                  here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-[5px] mb-2 border overflow-hidden'>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
