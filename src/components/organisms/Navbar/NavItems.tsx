"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export default function NavItems() {
  const [active, setActive] = useState<null | number>(null);
  const isAnyOpen = active !== null;
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    setActive(null);
  });

  // ESC button to close navbar if it open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.addEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className='flex gap-4 h-full' ref={ref}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const openHandler = () => {
          if (active === i) {
            setActive(null);
          } else {
            setActive(i);
          }
        };

        const isOpen = active === i;
        return (
          <NavItem
            category={category}
            openhandler={openHandler}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
}
