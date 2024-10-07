"use client";

import { Book, Cog, House, LucideProps, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

interface IItem {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  route: string;
}

const Sidebar = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { name: "All", icon: House, route: "/post" },
    { name: "Gardening Tips", icon: Book, route: "/post/tips" },
    { name: "Community", icon: UserRound, route: "/post/community" },
    { name: "Settings", icon: Cog, route: "/settings" },
  ];

  const handleClick = (item: IItem) => {
    setActiveMenu(item.name.toLowerCase());
    router.push(item.route);
  };

  return (
    <div className="min-w-64 dark:bg-green-950 bg-slate-200 dark:text-white md:flex flex-col hidden fixed h-full w-64">
      <nav className="flex-grow">
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center px-4 py-3 hover:bg-green-700 cursor-pointer ${
                activeMenu === item.name.toLowerCase() ? "bg-green-800" : ""
              }`}
              onClick={() => handleClick(item)}
            >
              <item.icon className="h-6 w-6 mr-3" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button className="bg-green-600 w-full py-2 rounded">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
