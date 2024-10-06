import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Authlogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./components/not-found";
import ShoppingHome from "./pages/shoping-view/home";
import ShoppingListing from "./pages/shoping-view/listing";
import ShoppingCheckout from "./pages/shoping-view/checkout";
import ShoppingAccount from "./pages/shoping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shoping-view/paypal-return";
import PaymentSuccessPage from "./pages/shoping-view/payment-success";
import SearchProducts from "./pages/shoping-view/search";


function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;


  console.log(isLoading, user);


  return (

    
    <div className="flex flex-col overflow-hidden bg-white">
   
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
          <Route path="login" element={<Authlogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
               <AdminLayout />

          </CheckAuth>
       }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="order" element={<AdminOrders />} />
          <Route path="feature" element={<AdminFeatures />} />
          <Route path="product" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >

        <Route path="home" element={<ShoppingHome />}/>
        <Route path="listing" element={<ShoppingListing/>}/>
        <Route path="checkout" element={<ShoppingCheckout />}/>
        <Route path="account" element={<ShoppingAccount/>}/>
        <Route path="paypal-return " element={<PaypalReturnPage/>}/>
        <Route path="paypal-return" element={<PaypalReturnPage />} />
        <Route path="payment-success" element={<PaymentSuccessPage />} />
        <Route path="search" element={<SearchProducts />} />
         
        </Route>

        <Route path="/unauth-page" element={<UnauthPage/>} />
        <Route path="*" element={<NotFound />} />
        <Route/>

      </Routes>
    </div>
  );
}

export default App;
