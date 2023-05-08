import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import images from "../constants/images";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logOut } from "../store/features/user/userSlice";

type NavItemInfo = {
  name: string;
  type: string;
  href?: string;
  items?: { title: string; href: string }[];
};

const navItemsInfo: NavItemInfo[] = [
  { name: "Home", type: "link", href: "/" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  { name: "Articles", type: "link", href: "/articles" },
  { name: "Pricing", type: "link", href: "/pricing" },
  { name: "FAQ", type: "link", href: "/faq" },
];

interface NavProps {
  item: NavItemInfo;
}

const NavItem = ({ item }: NavProps) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link to={item.href || "/"} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            {dropdown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:pt-2 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            {item.items && (
              <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden lg:-mt-1">
                {item.items.map((page, index) => (
                  <Link
                    key={index}
                    to={page.href}
                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                  >
                    {page.title}
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const navVisibility = () => {
    setIsVisible((visible) => !visible);
  };

  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem('user');
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <header className="container mx-auto px-5 flex justify-between py-4 items-center">
        <Link to="/">
          <img className="w-16 scale-[2.2]" src={images.logo} alt="logo" />
        </Link>
        <div className="lg:hidden z-50">
          {isVisible ? (
            <AiOutlineClose className="w-6 h-6" onClick={navVisibility} />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibility} />
          )}
        </div>
        <div
          className={`${
            isVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-3 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userInfo ? (
            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                    onClick={() => setProfileDrowpdown(profileDrowpdown => !profileDrowpdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-2 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                  >
                    <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-10 py-2 text-white lg:text-dark-soft"
                      >
                        Profile
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-10 py-2 text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button 
            onClick={() => navigate('/login')}
            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
