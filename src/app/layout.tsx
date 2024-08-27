import type { Metadata } from "next";
import ReactQueryProviders from "@/utils/providers/ReactQueryProviders";
import { MainStoreProvider } from "@/utils/providers/storeProvider";
import { Montserrat } from "next/font/google";
import { Raleway } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plantshop",
  description: "Ecommerce for house plants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProviders>
      <html lang='en' className='h-full'>
        <link rel='icon' href='/images/plant.png' sizes='10px' />

        <body
          className={cn(
            "relative h-full font-raleway antialiased",
            playfairDisplay.className
          )}
        >
          <MainStoreProvider>
            <main className='relative flex flex-col h-full'>{children}</main>
          </MainStoreProvider>
          <Toaster />
        </body>
      </html>
    </ReactQueryProviders>
  );
}
