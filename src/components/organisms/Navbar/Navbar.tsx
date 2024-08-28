import { ReactNode } from "react";
import ClientNavbar from "../ClientNavbar/ClientNavbar";
import NavbarServer from "../NavbarServer/NavbarServer";

interface NavbarProps {
  children: ReactNode;
  navbarStyle?: string;
}

export default function Navbar({ children, navbarStyle }: NavbarProps) {
  return (
    <>
      <ClientNavbar navbarStyle={navbarStyle}>
        <NavbarServer />
      </ClientNavbar>
      {children}
    </>
  );
}
