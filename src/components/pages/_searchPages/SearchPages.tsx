"use client";

import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import WidthWrapper from "@/components/WidthWrapper";
import { PaginationProduct } from "@/components/organisms/Pagination/Pagination";
import { getSearchProduct } from "@/services/getdata";
import { responses } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useState } from "react";

export default function SearchPages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchData = searchParams.get("q") || "";
  const searchDebounced = useDeferredValue(searchData);
  const [page, setPage] = useState(currentPage);

  const { data, isLoading, isFetching } = useQuery<responses | null>({
    queryKey: ["SEARCH_PRODUCT", page],
    queryFn: () => getSearchProduct(searchDebounced, page),
    refetchOnMount: true,
  });
  const isHasData = data?.data && data.data.length > 0;
  const pageCount = data?.pagination.totalPages || 1;
  const numPlaceholders = data?.data.length || 5;

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  return (
    <WidthWrapper className='mx-2 my-1 py-2 h-full'>
      <div className='flex flex-col h-full'>
        <div className='flex-1'>
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2'>
              {isLoading || isFetching ? (
                Array.from({ length: numPlaceholders }).map((_, i) => (
                  <Loading key={i} />
                ))
              ) : isHasData ? (
                data.data.map((item) => (
                  <CardProducts
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                  />
                ))
              ) : (
                <p>not found data</p>
              )}
            </div>
          </div>
        </div>
        <div className='mt-4 mx-2'>
          <PaginationProduct
            pageCount={pageCount}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </WidthWrapper>
  );
}
