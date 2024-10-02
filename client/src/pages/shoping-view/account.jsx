import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import CustomerService from "@/components/shopping-view/custmerServices";


function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      {/* Account header with image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Your Account</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-12 px-4">
        {/* Account Summary */}
        <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Your Account</h2>
          <p className="text-gray-500 text-center">
            Access your orders, update your address details, and get help from customer service.
          </p>
        </div>

        {/* Tabs for Orders, Address, and Customer Service */}
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-lg">
          <Tabs defaultValue="orders">
            {/* Tab List */}
            <TabsList className="flex justify-center space-x-8">
              <TabsTrigger
                value="orders"
                className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              >
                🛍️ Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              >
                📍 Address
              </TabsTrigger>
              <TabsTrigger
                value="customerService"
                className="px-6 py-2 text-lg font-medium text-gray-700 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
              >
                💬 Customer Service
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab Content */}
            <TabsContent value="orders">
              <div className="py-6">
                <h3 className="text-2xl font-semibold mb-4">Your Orders</h3>
                <ShoppingOrders />
              </div>
            </TabsContent>

            {/* Address Tab Content */}
            <TabsContent value="address">
              <div className="py-6">
                <h3 className="text-2xl font-semibold mb-4">Your Addresses</h3>
                <Address />
              </div>
            </TabsContent>

            {/* Customer Service Tab Content */}
            <TabsContent value="customerService">
              <div className="py-6">
                <h3 className="text-2xl font-semibold mb-4">Customer Service</h3>
                <CustomerService />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
