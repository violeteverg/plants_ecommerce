export const PRODUCT_CATEGORIES = [
  {
    label: "Product",
    value: "product" as const,
    featured: [
      {
        name: "Editor picks",
        href: "#",
        imageSrc: "/nav/ui-kits/bestsellers_succulent.jpg",
      },
      {
        name: "Best seller cactus",
        href: "#",
        imageSrc: "/nav/ui-kits/bestsellers_cactus.jpg",
      },
      {
        name: "New arrival",
        href: "#",
        imageSrc: "/nav/ui-kits/new_arrival.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Best seller",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
      {
        name: "New icons",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Most picks",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
    ],
  },
];
