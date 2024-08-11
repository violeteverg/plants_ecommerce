"use client";

import Bodypage from "@/components/organisms/BodyPage/BodyPage";
import CardProducts from "@/components/organisms/CardProducts/CardProducts";
import Loading from "@/components/organisms/Loading/Loading";
import { getGrowingMediaProduct } from "@/services/getdata";
import { responses } from "@/utils/schemas/productSchemas";
import { useQuery } from "@tanstack/react-query";

export default function GrowingMediaPages() {
  const { data, isLoading } = useQuery<responses>({
    queryKey: ["GROWING_MEDIA"],
    queryFn: getGrowingMediaProduct,
  });
  const product = data?.data || [];
  const numPlaceholders = data?.data.length || 5;
  return (
    <Bodypage
      image='/bgProduct/bg-growing_media-product.jpeg'
      text='Growing Media'
    >
      {isLoading
        ? Array.from({ length: numPlaceholders }).map((_, i) => (
            <Loading key={i} />
          ))
        : product.map((item) => (
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
