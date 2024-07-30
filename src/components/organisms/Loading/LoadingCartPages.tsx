import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingCartPages() {
  return (
    <div className='w-[90%]  my-4'>
      <div className='w-full flex rounded-xl border border-slate-400 p-2'>
        <Skeleton className='w-[90px] h-[90px] rounded-md' />

        <div className='flex justify-between w-full items-center p-2'>
          <div className='flex flex-col size-[80%] items-start justify-center gap-y-2'>
            <Skeleton className='w-[200px] h-[40px] rounded-md' />

            <Skeleton className='w-[100px] h-[20px] rounded-md' />
          </div>

          <div className='flex justify-center items-center gap-1'>
            <Skeleton className='w-[50px] h-[30px] rounded-md mx-1' />

            <Skeleton className='w-[30px] h-[30px] rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
