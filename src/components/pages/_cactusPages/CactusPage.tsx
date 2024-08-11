"use client";

import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import { response } from "@/utils/schemas/productSchemas";
import { getCactusProduct } from "@/services/getdata";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/organisms/Loading/Loading";
import Bodypage from "@/components/organisms/BodyPage/BodyPage";

export default function CactusPage() {
  const { data, isLoading, isError } = useQuery<response>({
    queryKey: ["CACTUS"],
    queryFn: getCactusProduct,
  });
  const numPlaceholders = data?.data.length || 5;
  return (
    <Bodypage image='/bgProduct/bg-cactus-product.jpg' text='Cactus'>
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
