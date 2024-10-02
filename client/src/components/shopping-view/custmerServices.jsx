function CustomerService() {
    return (
      <div className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Customer Service</h1>
          <p className="text-gray-600">How can we help you today?</p>
        </div>
  
        {/* Customer Service Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Us Section */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4 text-gray-700">For any inquiries, feel free to reach out to our support team.</p>
            <p className="font-medium">Email: support@example.com</p>
            <p className="font-medium">Phone: 1-800-123-4567</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Email Support
            </button>
          </div>
  
          {/* FAQs Section */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-2">
              <li className="text-gray-700">How do I track my order?</li>
              <li className="text-gray-700">What is the return policy?</li>
              <li className="text-gray-700">How can I change my shipping address?</li>
            </ul>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              View All FAQs
            </button>
          </div>
  
          {/* Shipping & Returns Section */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Shipping & Returns</h2>
            <p className="mb-4 text-gray-700">Learn more about our shipping options and return policies.</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Shipping Information
            </button>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Return Policy
            </button>
          </div>
  
          {/* Other sections for specific customer service topics */}
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Order Issues</h2>
            <p className="text-gray-700 mb-4">Have an issue with your order? Let us help you resolve it.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Report an Issue
            </button>
          </div>
  
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Account Help</h2>
            <p className="text-gray-700 mb-4">Need help with your account? We’ve got you covered.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Account Help
            </button>
          </div>
  
          <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-4">Payment Issues</h2>
            <p className="text-gray-700 mb-4">Having trouble with payments? We are here to assist you.</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Payment Support
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default CustomerService;
  