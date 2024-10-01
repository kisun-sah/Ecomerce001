/* eslint-disable react/prop-types */
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  //const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();




  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    // setRating(0);
    // setReviewMsg("");
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 text-black bg-slate-100 gap-8 sm:p-12 max-w-[90vw] max-h-[90vh] sm:max-h-[95vh] sm:max-w-[90vw] lg:max-w-[80vw] overflow-y-auto">
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          {/* Title and Description */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {productDetails?.title}
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              {productDetails?.description}
            </p>
          </div>

          {/* Price and Sale Price */}
          <div className="flex items-center justify-between mt-6">
            <p className={`text-3xl font-bold ${productDetails?.salePrice > 0 ? "line-through text-red-500" : "text-gray-900"}`}>
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-green-600">
                ₹{productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} className="w-5 h-5 fill-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">(4.5)</span>
          </div>

          {/* Stock and Button */}
          <div className="mt-6">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed bg-gray-800 text-white">
                Out of Stock
              </Button>
            ) : (
              <Button 
              className="w-full bg-black text-white hover:bg-gray-800 transition duration-200"
              onClick={() =>
                handleAddToCart(
                  productDetails?._id,
                  productDetails?.totalStock
                )
              }
              >
                
                Add to Cart
              </Button>
            )}
          </div>

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div className="flex gap-4" key={i}>
                    <Avatar className="h-10 w-10 border bg-gray-900 text-white">
                      <AvatarFallback className="text-lg font-extrabold">
                        K
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">Kisu Sah</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                          <StarIcon key={index} className="w-5 h-5 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-500">This is an awesome product.</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Write a Review Section */}
          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="Write a review..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in"
            />
            <Button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200 ease-in">
              Submit
            </Button>
          </div>
        </div>

        <Separator />
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
