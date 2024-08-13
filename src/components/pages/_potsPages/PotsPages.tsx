"use client";

import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getPotsProduct } from "@/services/getdata";
import { responses } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PotsPages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);
  const { data, isLoading } = useQuery<responses>({
    queryKey: ["POTS"],
    queryFn: () => getPotsProduct(page),
    refetchOnMount: true,
  });

  const product = data?.data || [];
  const pageCount = data?.pagination.totalPages || 1;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const numPlaceholders = product.length || 5;
  return (
    <Bodypage
      image='/bgProduct/bg-pots_product.jpg'
      text='Pots'
      pageCount={pageCount}
      currentPage={page}
      onPageChange={handlePageChange}
    >
      {isLoading
        ? Array.from({ length: numPlaceholders }).map((_, i) => (
            <Loading key={i} />
          ))
        : product?.map((item) => (
            <CardProducts
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          ))}
    </Bodypage>
  );
}
