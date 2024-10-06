function ShoppingFooter() {
    return (
      <footer className="bg-gray-900 text-white py-10 mb-0 ">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {/* Company Information */}
          <div>
            <h4 className="text-xl font-bold mb-4">About Us</h4>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for the best quality products at affordable prices. We aim to provide a seamless shopping experience.
            </p>
          </div>
  
          {/* Categories Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/shop/listing" className="hover:text-gray-300">Men</a></li>
              <li><a href="/shop/listing" className="hover:text-gray-300">Women</a></li>
              <li><a href="/shop/listing" className="hover:text-gray-300">Electronics</a></li>
              <li><a href="/shop/listing" className="hover:text-gray-300">Home & Living</a></li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><span>Email:</span> support@ecommerce.com</li>
              <li><span>Phone:</span> +123-456-7890</li>
              <li><span>Address:</span> 123 E-commerce St, Business City</li>
            </ul>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with the latest offers and products.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-md text-black"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">Subscribe</button>
            </form>
          </div>
        </div>
  
        {/* Bottom Section with Social Media and Legal Links */}
        <div className="border-t border-gray-700 mt-8 pt-6 px-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 E-commerce, Inc. All Rights Reserved.
            </div>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default ShoppingFooter;
  