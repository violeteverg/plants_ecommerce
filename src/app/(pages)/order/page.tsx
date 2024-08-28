import Navbar from "@/components/organisms/Navbar/Navbar";
import OrderPages from "@/components/pages/_orderPages/OrderPages";

const page: React.FC = () => {
  return (
    <Navbar navbarStyle='sticky'>
      <OrderPages />
    </Navbar>
  );
};

export default page;
