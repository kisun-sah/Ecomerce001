/* eslint-disable react/prop-types */


import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <img
      src={cartItem?.image}
      alt={cartItem?.title}
      className="w-24 h-24 rounded-lg object-cover border border-gray-200"
    />
    <div className="flex-1">
      <h3 className="font-extrabold text-lg text-gray-900">{cartItem?.title}</h3>
      <div className="flex items-center gap-3 mt-2">
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          size="icon"
          disabled={cartItem?.quantity === 1}
          onClick={() => handleUpdateQuantity(cartItem, "minus")}
        >
          <Minus className="w-5 h-5 text-gray-500" />
          <span className="sr-only">Decrease</span>
        </Button>
        <span className="font-semibold text-lg">{cartItem?.quantity}</span>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          size="icon"
          onClick={() => handleUpdateQuantity(cartItem, "plus")}
        >
          <Plus className="w-5 h-5 text-gray-500" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <p className="font-semibold text-lg text-indigo-600">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 2,
        }).format(
          (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
        )}
      </p>
      <Trash
        onClick={() => handleCartItemDelete(cartItem)}
        className="cursor-pointer mt-2 text-red-500 hover:text-red-700 transition-colors"
        size={24}
      />
    </div>
  </div>
  
  );
}

export default UserCartItemsContent;