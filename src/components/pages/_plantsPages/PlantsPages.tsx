"use client";

import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getPlantsProduct } from "@/services/getdata";
import { response } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";

export default function PlantsPages() {
  const { data, isLoading, isError } = useQuery<response>({
    queryKey: ["POKE"],
    queryFn: getPlantsProduct,
  });
  const numPlaceholders = data?.data.length || 5;
  return (
    <Bodypage image='/bgProduct/bg-plants-product.jpg' text='Plants'>
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
