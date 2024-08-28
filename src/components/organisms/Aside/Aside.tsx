"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useState, useEffect } from "react";
import { NavMenuItem } from "@/lib/mock/NavMenuItem";
import { useMainStore } from "@/utils/providers/storeProvider";

export default function Aside() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const pathname = usePathname();
  const { activePage, setActivePage } = useMainStore((state) => ({
    activePage: state.activePage,
    setActivePage: state.setActivePage,
  }));
  const pagePath = activePage.replace(/\//g, "");

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname, setActivePage]);

  const handleToggle = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className='border-r border-dark-grey h-screen flex flex-col'>
      {/* breadcrumb component */}
      <div className='p-2 flex flex-col'>
        <div className='px-4'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{pagePath}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* categories link search */}
        <div className='font-semibold mt-8 px-4'>
          <h1>Browse by</h1>
          <hr className='w-[200px] my-2 border-black' />
        </div>

        <div className='flex flex-col my-4 gap-2 px-4'>
          {NavMenuItem.map((item, index) => (
            <div key={index} className='flex flex-col'>
              {item?.displayChildren ? (
                <div
                  className='flex justify-between items-center cursor-pointer py-1 font-semibold'
                  onClick={() => handleToggle(index)}
                >
                  <p className='font-thin'>{item?.name}</p>
                </div>
              ) : (
                <Link href={`${item?.path}`} className='py-1'>
                  {item?.name}
                </Link>
              )}
              {openItems[index] && item?.children && (
                <div className='pl-4'>
                  {item?.children.map((child, i) => (
                    <div key={i} className='py-1'>
                      <Link href={` ${child?.path}`}>{child?.name}</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* filter price */}
      </div>
    </div>
  );
}
