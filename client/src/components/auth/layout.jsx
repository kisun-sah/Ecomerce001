import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Section: Welcome Text */}
      <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-black w-full lg:w-1/2 px-8 py-16">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to ECommerce Shopping
          </h1>
          <p className="text-lg text-gray-100">
            Your one-stop shop for everything you need.
          </p>
        </div>
      </div>

    {/* Right Section: Registration/Login Form */}
<div className="flex flex-1 items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400 px-6 py-12 sm:px-8 lg:px-12">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 p-8">
    <Outlet />
  </div>
</div>

    </div>
  );
}

export default AuthLayout;
