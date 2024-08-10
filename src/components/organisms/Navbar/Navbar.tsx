import { ReactNode } from "react";
import ClientNavbar from "../ClientNavbar/ClientNavbar";
import NavbarServer from "../NavbarServer/NavbarServer";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <>
      <ClientNavbar>
        <NavbarServer />
      </ClientNavbar>
      {children}
    </>
  );
}
