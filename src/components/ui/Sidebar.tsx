"use client";

import { Book, Cog, House, LucideProps, NotebookPen, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("home");

  const menuItems = [
    { name: "All", icon: House, route: "/post" },
    { name: "Add Post", icon: NotebookPen, route: "/post/add-post" },
    { name: "Gardening Tips", icon: Book, route: "/post/tips" },
    { name: "Community", icon: UserRound, route: "/post/community" },
    { name: "Settings", icon: Cog, route: "/settings" },
  ];

  const handleClick = (item: IItem) => {
    setActiveMenu(item.name.toLowerCase());
    router.push(item.route);
  };

  return (
    <div className="min-w-64 dark:bg-gradient-to-br dark:from-green-950 dark:to-teal-800 bg-slate-200 dark:text-white md:flex flex-col hidden fixed h-full w-64">
      <nav className="flex-grow">
        <ul className="mt-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center px-4 py-3 dark:hover:bg-gradient-to-r dark:hover:from-green-950 dark:hover:to-teal-800 hover:bg-slate-300 cursor-pointer ${
                pathname === item.route
                  ? "dark:bg-gradient-to-r dark:from-green-900 dark:to-teal-700 bg-slate-300 dark:text-white"
                  : ""
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
