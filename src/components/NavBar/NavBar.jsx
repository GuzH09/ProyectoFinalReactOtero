import CartWidget from "../CartWidget/CartWidget";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky w-full shadow-md bg-gray-100">
      <div className="flex flex-row justify-between items-center h-16 px-56">
        <div className="w-1/3">
          <Link to="/" className="flex flex-row items-center">
            <div className="h-16 w-16 p-2">
              <img src={"/images/logo.png"} className="object-contain w-full" />
            </div>
            <h3 className="text-[#21232A] hover:text-gray-400 text-sm text-left">
              GuzH Tech Store
            </h3>
          </Link>
        </div>

        <div className="flex flex-row text-[#21232A] text-sm w-1/3 justify-center gap-8">
          <NavLink to={`/category/celular`}>Celulares</NavLink>
          <NavLink to={`/category/tablet`}>Tablets</NavLink>
          <NavLink to={`/category/notebook`}>Notebooks</NavLink>
        </div>

        <div className="w-1/3">
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
