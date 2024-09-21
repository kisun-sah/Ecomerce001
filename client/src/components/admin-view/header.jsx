import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

// eslint-disable-next-line react/prop-types
function AdminHeader({ setOpen }) {  // Receive setOpen as a prop from AdminLayout
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b shadow-lg transition-shadow duration-300 hover:shadow-2xl">
    {/* Menu Toggle Button for small screens */}
    <Button
  className="lg:hidden sm:block text-gray-100 bg-gray-800 hover:text-gray-300 hover:bg-black hover:shadow-lg border border-gray-300 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
  onClick={() => setOpen(true)}
>
  <AlignJustify className="w-5 h-5" />
  <span className="sr-only">Toggle Menu</span>
</Button>

  
    <div className="flex flex-1 justify-end">
      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-md text-white bg-black transition-transform duration-300 transform hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  </header>
  
  );
}

export default AdminHeader;
