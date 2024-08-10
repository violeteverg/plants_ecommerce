import ClientNavbar from "@/components/organisms/ClientNavbar/ClientNavbar";
import Navbar from "@/components/organisms/Navbar/Navbar";
import NavbarServer from "@/components/organisms/NavbarServer/NavbarServer";
import { DetailProduct } from "@/components/pages/_DetailProduct";

const page: React.FC = () => {
  return (
    <Navbar>
      <DetailProduct />
    </Navbar>
  );
};

export default page;
