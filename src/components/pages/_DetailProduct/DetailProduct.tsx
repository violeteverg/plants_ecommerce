"use client";

import WidthWrapper from "@/components/WidthWrapper";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { getProductId } from "@/services/getdata";
import { addCart } from "@/services/postdata";
import { useMainStore } from "@/utils/providers/storeProvider";
import { TPostCart } from "@/utils/schemas/cartSchemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export default function DetailProduct() {
  const queryClient = useQueryClient();
  const { count, increment, decrement, productId, resetCount, setIsOpen } =
    useMainStore((state) => ({
      count: state.count,
      increment: state.increment,
      decrement: state.decrement,
      productId: state.productId,
      resetCount: state.resetCount,
      setIsOpen: state.setIsOpen,
    }));

  const {
    data: dataProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PRODUCTID", productId],
    queryFn: () => getProductId(productId),
  });

  const { mutate } = useMutation({
    mutationFn: (val: TPostCart) => {
      console.log(val);
      return addCart(val);
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["CARTITEMS"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const productDetails = useMemo(() => {
    if (!dataProduct) return null;
    return {
      title: dataProduct?.title,
      latinName: dataProduct.latinName,
      description: dataProduct.description,
      image: dataProduct.image,
      price: dataProduct.price,
      quantity: dataProduct.quantity,
      category: dataProduct.category,
      discount: dataProduct.discount,
    };
  }, [dataProduct]);

  const handleDecrement = () => {
    if (count > 1) {
      decrement();
    }
  };

  const addToCart = () => {
    if (productDetails) {
      mutate({ productId: dataProduct?.id, quantity: count });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    resetCount();
  }, [productId, resetCount]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !productDetails) {
    return <div>Error loading product</div>;
  }

  return (
    <>
      <Navbar navbarStyle='sticky' />
      <WidthWrapper className='flex justify-center items-center text-white h-screen'>
        <div className='flex border border-black rounded-lg h-[80%] w-[80%] px-5 py-2 gap-1'>
          <div className='flex h-[100%] w-[100%] justify-center items-center'>
            <Image
              src={productDetails.image}
              alt={productDetails.title}
              width={500}
              height={300}
              className='drop-shadow-xl'
            />
          </div>
          <div className='w-[150%] h-full bg-teal-800 rounded-md flex flex-col justify-center items-center'>
            <div className='w-[80%] pb-5'>
              <h1 className='text-4xl font-[600]'>{productDetails.title}</h1>
              <p className='italic'>
                {productDetails.latinName
                  ? `(${productDetails.latinName})`
                  : null}
              </p>
              <div className='w-full h-[200px] mt-6 overflow-auto'>
                <p>{productDetails.description}</p>
              </div>
            </div>

            <div className='flex flex-col w-[80%] py-4 space-y-4'>
              <div className='w-full '>
                <div className='flex gap-2 leading-loose'>
                  <div className='bg-white w-[20%] justify-between flex items-center border border-black rounded-md p-1'>
                    <Button
                      variant='transparant'
                      size='xs'
                      className='flex items-center justify-center h-full text-black'
                      onClick={handleDecrement}
                    >
                      <Minus className='h-[80%] w-[80%]' />
                    </Button>
                    <input
                      type='number'
                      className=' placeholder:leading-loose text-black w-[30%] h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none'
                      placeholder='0'
                      value={count}
                      min={1}
                      max={100}
                      readOnly
                    />
                    <Button
                      variant='transparant'
                      size='xs'
                      className='flex items-center justify-center h-full text-black'
                      onClick={increment}
                      disabled={count >= productDetails.quantity}
                    >
                      <Plus className='h-[80%] w-[80%]' />
                    </Button>
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='italic font-mono'>
                      Stok : {productDetails.quantity}
                    </p>
                    <p className='font-mono'>
                      {formatPrice(productDetails.price)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex justify-between gap-3 w-full'>
                <Button className='font-mono w-[24%]' onClick={addToCart}>
                  <p className='font-[800]'>+cart</p>
                </Button>
                <Button className='w-full font-mono text-white font-[800]'>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </WidthWrapper>
    </>
  );
}
