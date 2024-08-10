import AboutUs from "@/components/organisms/AboutUs/AboutUs";
import Footer from "@/components/organisms/Footer/Footer";
import Hero from "@/components/organisms/Hero/Hero";
import Section from "@/components/organisms/Section/Section";
import ListProduct from "@/components/organisms/ListProduct/ListProduct";
import NavbarServer from "@/components/organisms/NavbarServer/NavbarServer";
import ClientNavbar from "@/components/organisms/ClientNavbar/ClientNavbar";

export default function HomePage() {
  return (
    <div>
      <ClientNavbar navbarStyle='fixed'>
        <NavbarServer />
      </ClientNavbar>
      <Hero />
      <ListProduct />
      <AboutUs />
      <Section />
      <Footer />
    </div>
  );
}
