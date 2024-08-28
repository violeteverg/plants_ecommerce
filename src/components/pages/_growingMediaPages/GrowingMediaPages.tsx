"use client";

import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getGrowingMediaProduct } from "@/services/getdata";
import { responses } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GrowingMediaPages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const { data, isLoading } = useQuery<responses>({
    queryKey: ["GROWING_MEDIA"],
    queryFn: () => getGrowingMediaProduct(page),
    refetchOnMount: true,
  });
  const product = data?.data || [];
  const numPlaceholders = data?.data?.length || 5;
  const pageCount = data?.pagination?.totalPages || 1;
  const isHasData = product?.length !== 0;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };
  return (
    <Bodypage
      image='/bgProduct/bg-growing_media-product.jpeg'
      text='Growing Media'
      pageCount={pageCount}
      currentPage={page}
      onPageChange={handlePageChange}
      isHasData={isHasData}
    >
      {isLoading
        ? Array.from({ length: numPlaceholders }).map((_, i) => (
            <Loading key={i} />
          ))
        : product?.map((item) => (
            <CardProducts
              key={item?.id}
              id={item?.id}
              title={item?.title}
              price={item?.price}
              image={item?.image}
            />
          ))}
    </Bodypage>
  );
}
