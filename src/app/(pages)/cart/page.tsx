import Navbar from "@/components/organisms/Navbar/Navbar";
import { CartPages } from "@/components/pages";

const page: React.FC = () => {
  return (
    <Navbar>
      <CartPages />
    </Navbar>
  );
};

export default page;
