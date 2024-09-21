import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/products-slice"; // Correct the import statement

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice, // Make sure this key matches the slice name
  }
});

export default store;
