import Navbar from "@/components/organisms/Navbar/Navbar";
import SearchPages from "@/components/pages/_searchPages/SearchPages";

const page: React.FC = () => {
  return (
    <Navbar navbarStyle='sticky'>
      <SearchPages />
    </Navbar>
  );
};

export default page;
