import AboutUs from "@/components/organisms/AboutUs/AboutUs";
import Footer from "@/components/organisms/Footer/Footer";
import Hero from "@/components/organisms/Hero/Hero";
import Section from "@/components/organisms/Section/Section";
import ListProduct from "@/components/organisms/ListProduct/ListProduct";
import Navbar from "@/components/organisms/Navbar/Navbar";

export default function HomePage(){
    return(
        <div>
            <Navbar navbarStyle="fixed"/>
            <Hero />
            <ListProduct />
            <AboutUs />
            <Section />
            <Footer />
        </div>
    )
}