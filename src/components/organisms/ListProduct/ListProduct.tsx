import React from "react";
import WidthWrapper from "@/components/WidthWrapper";
import CardProduct from "./CardProduct/CardProduct";
import { DummyCardProduct } from "@/lib/mock/DummyCardProduct";

export default function ListProduct() {
  return (
    <WidthWrapper>
      <div className='flex flex-row justify-center h-full items-center gap-4 mt-4'>
        {DummyCardProduct.map((items, i) => (
          <CardProduct
            key={i}
            title={items?.title}
            image={items?.image}
            link={items?.link}
          />
        ))}
      </div>
    </WidthWrapper>
  );
}
