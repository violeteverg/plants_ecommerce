"use client";

import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getAllProduct } from "@/services/getdata";
import { response } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";

export default function AllProductPages() {
  const { data, isLoading, isError } = useQuery<response>({
    queryKey: ["POKE"],
    queryFn: getAllProduct,
    refetchOnMount: true,
  });

  const numPlaceholders = data?.data.length || 5;
  return (
    <Bodypage image='/bgProduct/bg-all_product.jpg' text='Plants'>
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
