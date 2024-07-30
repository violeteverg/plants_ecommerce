import WidthWrapper from "@/components/WidthWrapper";
import Link from "next/link";
import { buttonVariants,Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <WidthWrapper className="relative bg-cover bg-fixed bg-center h-screen bg-[url('/test_5.jpg')]">
      <div className='absolute inset-0 bg-gradient-to-t from-white/60 to-transparent'></div>
      <div className='relative py-72 h-full ml-20 text-left flex flex-col max-w-3xl items-start'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          Your marketplace for high-quality{" "}
          <span className='text-[#f4a261]'>digital assets</span>
        </h1>
        <p className='mt-6 text-lg max-w-prose'>
          Welcome to OrcaDigital. Every asset on our platform is verified by our
          team to ensure our highest quality standards.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <Link
            href={"/products"}
            className={buttonVariants({ className: "!bg-olive" })}
          >
            Browse Trending
          </Link>
          <Button variant='ghost' className='text-olive border border-olive'>
            Our quality promise &rarr;
          </Button>
        </div>
        {/* TODO: List Product */}
      </div>
    </WidthWrapper>
  );
}
