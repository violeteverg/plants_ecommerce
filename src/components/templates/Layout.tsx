import Aside from "../organisms/Aside/Aside";
import Navbar from "../organisms/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar navbarStyle='sticky ' /> */}
      <div className='flex mt-4 h-[calc(100vh-4rem)] overflow-hidden'>
        <Aside />
        {children}
      </div>
    </>
  );
}
