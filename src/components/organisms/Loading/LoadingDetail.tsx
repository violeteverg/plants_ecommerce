import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDetail() {
  return (
    <div className='flex justify-center items-center text-white h-screen'>
      <div className='flex border border-black rounded-lg h-[80%] w-[80%] px-5 py-2 gap-1 bg-gray-200'>
        <div className='flex h-[100%] w-[100%] justify-center items-center'>
          <Skeleton className='h-[300px] w-[500px]' />
        </div>
        <div className='w-[150%] h-full bg-teal-800 rounded-md flex flex-col justify-center items-center'>
          <div className='w-[80%] pb-5'>
            <Skeleton className='h-8 w-3/4 mb-2' />
            <Skeleton className='h-6 w-1/4' />
            <div className='w-full h-[200px] mt-6 overflow-auto'>
              <Skeleton className='h-full w-full' />
            </div>
          </div>

          <div className='flex flex-col w-[80%] py-4 space-y-4'>
            <div className='w-full'>
              <div className='flex gap-2 leading-loose'>
                <div className='bg-white w-[20%] justify-between flex items-center border border-black rounded-md p-1'>
                  <Skeleton className='h-full w-16 mx-2' />
                </div>
              </div>
            </div>
            <div className='flex justify-between gap-3 w-full'>
              <Skeleton className='h-10 w-1/4' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
