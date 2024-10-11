import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false); // Control sidebar state

  return (
    <div className=" flex min-h-screen w-full">
      {/* Admin Sidebar */}
      
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}  />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
      
        <AdminHeader setOpen={setOpenSidebar} />
       
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          {/* Your page content */}
          <Outlet />

        </main>
      </div>
    </div>
  );
}

export default AdminLayout;




