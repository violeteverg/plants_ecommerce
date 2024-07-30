import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCartItems() {
  return (
    <div className='w-full flex rounded-xl border border-black p-2'>
      <Skeleton className='w-[50px] h-[50px] rounded-md' />

      <div className='flex justify-between w-full items-center p-2'>
        <div className='flex flex-col items-start justify-center gap-y-1'>
          <Skeleton className='w-[150px] h-[20px] rounded-md' />

          <Skeleton className='w-[100px] h-[15px] rounded-md' />
        </div>

        <div className='flex justify-center items-center gap-1'>
          <div className='bg-gray-300 flex items-center border border-black rounded-md p-1'>
            <Skeleton className='w-[30px] h-[30px] rounded-md' />
            <Skeleton className='w-[50px] h-[30px] rounded-md mx-1' />
            <Skeleton className='w-[30px] h-[30px] rounded-md' />
          </div>

          <Skeleton className='w-[30px] h-[30px] rounded-md' />
        </div>
      </div>
    </div>
  );
}
