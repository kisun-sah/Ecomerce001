import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// Sidebar menu items
const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icon: <BadgeCheck />,
  },
];

// MenuItems Component
// eslint-disable-next-line react/prop-types
function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen && setOpen(false);
          }}
          className="flex cursor-pointer text-lg items-center gap-3 rounded-md px-3 py-2 transition-all duration-300 text-gray-400 hover:bg-teal-500 hover:text-white"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

// AdminSideBar Component

// eslint-disable-next-line react/prop-types
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Sheet for smaller screens */}
      <Sheet open={open} onOpenChange={setOpen}>
  <SheetContent
    side="left"
    className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg"
  >
    <div className="flex flex-col h-full">
      <SheetHeader className="border-b border-gray-700 pb-4">
        <SheetTitle className="flex gap-2 mt-5 mb-5 items-center">
          <ChartNoAxesCombined size={30} className="text-teal-400" />
          <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
        </SheetTitle>
      </SheetHeader>
      <MenuItems setOpen={setOpen} />
    </div>
  </SheetContent>
</Sheet>



      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 flex-col border-r bg-gradient-to-b from-gray-800 to-gray-900 p-6 lg:flex shadow-lg">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 mb-8"
        >
          <ChartNoAxesCombined size={30} className="text-teal-400" />
          <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
