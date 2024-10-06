import Sidebar from "@/src/components/ui/Sidebar";
import { ILayoutProps } from "@/src/types";

const layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="md:ml-64">{children}</div>
    </div>
  );
};

export default layout;
