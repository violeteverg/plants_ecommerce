"use client";

import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import { response } from "@/utils/schemas/productSchemas";
import { getCactusProduct } from "@/services/getdata";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/organisms/Loading/Loading";
import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CactusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const { data, isLoading, isError } = useQuery<response>({
    queryKey: ["CACTUS"],
    queryFn: () => getCactusProduct(page),
    refetchOnMount: true,
  });

  const numPlaceholders = data?.data?.length || 5;
  const pageCount = data?.pagination?.totalPages || 1;
  const product = data?.data || [];
  const isHasData = product?.length !== 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };
  return (
    <Bodypage
      image='/bgProduct/bg-cactus-product.jpg'
      text='Cactus'
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
