import Navbar from "@/components/organisms/Navbar/Navbar";
import { PaymentPages } from "@/components/pages/_payment";

const page: React.FC = () => {
  return (
    <Navbar>
      <PaymentPages />
    </Navbar>
  );
};

export default page;
