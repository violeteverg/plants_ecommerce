"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getAllProduct } from "@/services/getdata";
import { response } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";

export default function AllProductPages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(currentPage);

  const { data, isLoading } = useQuery<response>({
    queryKey: ["products", page],
    queryFn: () => getAllProduct(page),
    refetchOnMount: true,
  });
  console.log(data);

  const numPlaceholders = data?.data.length || 5;
  const pageCount = data?.pagination.totalPages || 1;

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  return (
    <Bodypage
      image='/bgProduct/bg-all_product.jpg'
      text='Plants'
      pageCount={pageCount}
      currentPage={page}
      onPageChange={handlePageChange}
    >
      {isLoading
        ? Array.from({ length: numPlaceholders }).map((_, i) => (
            <Loading key={i} />
          ))
        : data?.data.map((item) => (
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
