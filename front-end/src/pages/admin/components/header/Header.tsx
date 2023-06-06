import { Link } from "react-router-dom";
import images from "../../../../constants/images";
import { useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComments className="text-xl" />,
    name: "comments",
    type: "link",
  },
  {
    title: "Posts",
    content: [
      { title: "New", link: "/admin/posts/new" },
      { title: "Manage", link: "/admin/posts/manage" },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
];

type ActiveName = "dashboard" | "posts" | "comments";

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState<ActiveName>("dashboard");

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  return (
    <header className="flex h-fit w-full justify-between px-8 p-3">
      <Link to="/">
        <img src={images.logo} alt="logo" className="w-16 scale-[2]" />
      </Link>
      <div className="cursor-pointer">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6 mt-2" onClick={toggleMenu} />
        ) : (
          <AiOutlineMenu className="w-6 h-6 mt-2" onClick={toggleMenu} />
        )}
      </div>
      {/* sidebar */}
      {isMenuActive && (
        <div className="fixed inset-0">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleMenu}
          />

          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4">
            <Link to="/">
              <img src={images.logo} alt="logo" className="w-16 scale-[2]" />
            </Link>
            <h4 className="mt-10 font-bold text-blue-700">Main Menu</h4>
            menu items
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem 
                  key={item.name}
                  title={item.title}
                  link={item.link}
                  name={item.name}
                  icon={item.icon}
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse 
                  key={item.title}
                  title={item.title}
                  content={item.content}
                  name={item.name}
                  icon={item.icon}
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
