"use client";

import Navbar from "@/components/organisms/Navbar/Navbar";
import Layout from "@/components/templates/Layout";

export default function Product({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
