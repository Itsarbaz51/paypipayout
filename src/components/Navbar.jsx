import { useState } from "react";
import { Bell, ChevronDown, Settings, User, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { protectedRoute } from "../../index";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const isProtectedRoute = protectedRoute.includes(location.pathname);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Testimonial", link: "/testimonial" },
    {
      name: "Pages",
      dropdown: [
        { name: "About", link: "/about" },
        { name: "Team", link: "/team" },
        { name: "Price", link: "/pricing" },
        { name: "FAQ", link: "/faq" },
        { name: "404", link: "/404" },
      ],
    },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <nav
      className={` border-b border-gray-500 ${!isProtectedRoute ?
        "flex items-center justify-between px-8 py-4 backdrop-blur-2xl sticky top-0  z-50" : "py-5"
        }`}
    >
      {!isProtectedRoute ?
        <div className="sm:flex sm:justify-between sm:items-center sm:w-full">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">impulse</div>

          {/* Menu */}
          <div className="hidden md:flex items-center bg-white shadow px-6 py-2 rounded-full space-x-8">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-black">
                    <span>{item.name}</span>
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className="text-gray-700 hover:text-black font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown */}
                {openDropdown === item.name && item.dropdown && (
                  <div className="absolute left-0 mt-3 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {item.dropdown.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.link}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link to={'/login'} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition">
              Login
            </Link>
            <Link to={'/register'} className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition">
              Register
            </Link>
          </div>
        </div>
        :
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Azzunique Wallet
                </h1>
                <p className="text-sm text-gray-500">Wallet Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <User className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;
