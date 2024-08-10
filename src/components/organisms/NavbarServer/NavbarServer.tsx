import Link from "next/link";
import { Icons } from "@/components/Icon";
import { cn } from "@/lib/utils";
import WidthWrapper from "@/components/WidthWrapper";
import SearchBar from "../Navbar/SearchBar";
import NavItems from "../Navbar/NavItems";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Cart from "../Navbar/Cart";
import { isAuthenticateds } from "@/utils/auth";

export default function NavbarServer() {
  const user = isAuthenticateds();

  return (
    <header className='relative h-full bg-transparent lg:mx-4 mt-2'>
      <WidthWrapper>
        <div className='flex h-16 items-center'>
          <div className='ml-4 flex lg:ml-0'>
            <Link href='/'>
              <Icons.logo />
            </Link>
          </div>

          <div className='lg:mx-8 lg:block'>
            <SearchBar />
          </div>

          <div className='hidden z-50 lg:ml-8  lg:block lg:self-stretch'>
            <NavItems />
          </div>

          <div className='ml-auto flex items-center'>
            <div className='hidden md:mr-6 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:space-x-6'>
              {user ? null : (
                <Link
                  href='/Login'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  Login
                </Link>
              )}
              {user ? null : (
                <Separator
                  className='h-6 w-px bg-gray-200'
                  aria-hidden='true'
                />
              )}
              {user ? (
                <p></p>
              ) : (
                <Link
                  href='/Register'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  Register
                </Link>
              )}
              {user ? null : (
                <Separator
                  className='h-6 w-px bg-gray-200'
                  aria-hidden='true'
                />
              )}
              <div className='ml-4 flow-root lg:ml-6'>
                {!user ? null : <Cart />}
                {/* <Cart /> */}
              </div>
            </div>
          </div>
        </div>
      </WidthWrapper>
    </header>
  );
}
