"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../../ui/input";
import React from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const params = new URLSearchParams(searchParams);
      if (target.value) {
        params.set("q", target.value);
      } else {
        params.delete("q");
      }
      if (!params.has("page")) {
        params.set("page", "1");
      }
      replace(`/search?${params.toString()}`);
    }
  };
  return (
    <div className='relative w-[500px]'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      <Input
        type='text'
        placeholder='Search'
        className='pl-12 pr-4'
        onKeyDown={searchHandler}
      />
    </div>
  );
}
