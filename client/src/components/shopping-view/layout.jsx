import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* common header */}
      <ShoppingHeader />

      {/* main content will take all remaining space */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* footer */}
      <ShoppingFooter />
    </div>
  );
}

export default ShoppingLayout;
