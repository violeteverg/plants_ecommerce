"use client";

import WidthWrapper from "../../WidthWrapper";
import Link from "next/link";
import { Icons } from "../../Icon";
import SearchBar from "./SearchBar";
import NavItems from "./NavItems";
import { buttonVariants } from "../../ui/button";
import { Separator } from "../../ui/separator";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import { cn } from "@/lib/utils";
import { useMainStore } from "@/utils/providers/storeProvider";

export default function Navbar({ navbarStyle }: { navbarStyle: string }) {
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isAuthenticated } = useMainStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));
  console.log(isAuthenticated);
  const user = isAuthenticated;

  // when user scrolling down navbar will like hidden
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setVisible(currentPosition <= 80);
      setScrollPosition(currentPosition);

      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(true), 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`bg-transparent ${
        visible ? Style.fadeIn : Style.fadeOut
      } ${navbarStyle} z-50 top-0 inset-x-0 h-[80px] ${
        scrollPosition > 80 ? Style.blurredBackground : ""
      }`}
    >
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
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      `${scrollPosition > 80 ? "text-black" : "text-gray-900"}`
                    )}
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
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      `${scrollPosition > 80 ? "text-black" : "text-gray-900"}`
                    )}
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
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </WidthWrapper>
      </header>
    </div>
  );
}
