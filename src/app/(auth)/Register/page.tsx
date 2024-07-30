"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Icons } from "@/components/Icon";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TResponseCreate,
  TSignUpschema,
  signUpSchema,
} from "@/utils/schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/login";
import { useState } from "react";
import { useMainStore } from "@/utils/providers/storeProvider";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [focused, setFocused] = useState(false);
  const { setAuthenticated } = useMainStore((state) => ({
    setAuthenticated: state.setAuthenticated,
  }));
  const router = useRouter();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TSignUpschema>({ resolver: zodResolver(signUpSchema) });
  const passwordValue = watch("password");

  const { mutate } = useMutation({
    mutationFn: (val: TSignUpschema) => {
      console.log(val);
      return createUser(val);
    },
    onSuccess: (data: TResponseCreate) => {
      setAuthenticated(true);
      router.push("./product");
      console.log("succes", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = (val: TSignUpschema) => {
    console.log(val);
    mutate(val);
  };

  console.log(errors);

  return (
    <>
      <div className='flex mx-20 mt-20 flex-col items-center justify-center lg:px0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px] '>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-bold'>Create an account</h1>

            <Link
              href='/Login'
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>First Name</Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='first name'
                        className={cn({
                          "focus-visible:ring-red-500": errors.firstName,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>Last Name</Label>
                  <Controller
                    control={control}
                    name='lastName'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='last name'
                        className={cn({
                          "focus-within:ring-red-500": errors.lastName,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email' className='mb-2'>
                    Email
                  </Label>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='your@email.com'
                        className={cn({
                          "focus-within:ring-red-500": errors.email,
                        })}
                      />
                    )}
                  />
                  {errors.email && (
                    <span className='text-xs text-red-400'>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='password'
                        onChange={onChange}
                        value={value}
                        placeholder='password'
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn({
                          "focus-visible:ring-red-500":
                            focused &&
                            passwordValue &&
                            passwordValue.length < 8,
                        })}
                      />
                    )}
                  />
                  {focused && passwordValue && passwordValue.length < 8 && (
                    <span className='text-xs'>
                      Please enter at least 8 characters for password.
                    </span>
                  )}
                  {errors.password && (
                    <span className='text-xs text-red-400'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type='submit'>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
