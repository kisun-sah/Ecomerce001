import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false); // Control sidebar state

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Admin Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      
      <div className="flex flex-1 flex-col w-full">
        {/* Admin Header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col bg-muted/40 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;


