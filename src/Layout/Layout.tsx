import Aside from "@/components/organisms/Aside/Aside";
import ClientNavbar from "@/components/organisms/ClientNavbar/ClientNavbar";
import NavbarServer from "@/components/organisms/NavbarServer/NavbarServer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientNavbar navbarStyle='sticky'>
        <NavbarServer />
      </ClientNavbar>
      <div className='flex mt-4 h-[calc(100vh-4rem)] overflow-hidden'>
        <Aside />
        {children}
      </div>
    </>
  );
}
