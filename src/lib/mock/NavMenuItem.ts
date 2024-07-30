export const NavMenuItem = [
  {
    name: "All Product",
    path: "/product",
    displayChildren: false,
  },
  {
    name: "Cactus",
    path: "/cactus",
    displayChildren: false,
  },
  {
    name: "Succulents",
    path: "/succulents",
    displayChildren: false,
  },
  {
    name: "Plants",
    path: "/plants",
    displayChildren: false,
  },
  {
    name: "Others",
    displayChildren: true,
    children: [
      {
        name: "Pots",
        path: "/pots",
        displayChildren: false,
      },
      {
        name: "Growing Media",
        path: "/growing_media",
        displayChildren: false,
      },
    ],
  },
];
