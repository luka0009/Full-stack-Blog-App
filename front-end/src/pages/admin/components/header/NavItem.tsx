import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  link?: string;
  title: string;
  icon: any;
  name: string;
  activeNavName: string;
  setActiveNavName: Dispatch<SetStateAction<any>>;
}

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}: NavItemProps) => {
  return (
    <NavLink
      to={link ? link : "/"}
      className={`${
        name === activeNavName
          ? "font-bold text-primary"
          : "font-semibold text-[#A5A5A5]"
      } flex items-center gap-x-2 py-2 text-lg`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;
