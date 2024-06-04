
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom"



export const Header =()=> {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/main">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" to="/">
            Palabras
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/">

            Actividad
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to="/">
            Foro
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/auth">Login</Link >
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

