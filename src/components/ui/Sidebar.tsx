"use client";

import { siteConfig } from "@/src/config/site";
import { useUser } from "@/src/context/user.provider";
import { LucideProps } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";

interface IItem {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  route: string;
}

const Sidebar = () => {
  const [sideMenus, setSideMenus] = useState<IItem[] | []>([]);
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();

  useEffect(() => {
    if (user && user.role === "admin") {
      setSideMenus(siteConfig.adminSidebarItems);
    } else setSideMenus(siteConfig.userSidebarItems);
  }, [user]);

  const handleClick = (item: IItem) => {
    router.push(item.route);
  };

  return (
    <div className="min-w-64 dark:bg-gradient-to-br dark:from-green-950 dark:to-teal-800 bg-slate-200 dark:text-white md:flex flex-col hidden fixed h-full w-64">
      <nav className="flex-grow">
        <ul className="mt-6">
          {sideMenus.map((item) => (
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
