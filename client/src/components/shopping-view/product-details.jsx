/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

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
    setRating(0);
    setReviewMsg("");
  }
  function handleAddReview() {
    // Check if the user has already reviewed this product
    const existingReview = reviews.find(
      (reviewItem) => reviewItem.userId === user?.id
    );
  
    if (existingReview) {
      toast({
        title: "You have already reviewed this product!",
        variant: "destructive", // Show this as an error
      });
      return; // Stop execution if the user has already reviewed
    }
  
    // Proceed to add the review if not already reviewed
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }
  

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
<DialogContent 
  className="
    grid 
    grid-cols-1 sm:grid-cols-2 
    gap-4 sm:gap-8 
    p-4 sm:p-8 lg:p-10 
    max-w-[95vw] sm:max-w-[80vw] 
    max-h-[95vh] sm:max-h-[90vh] lg:max-h-[95vh] 
    mt-2 sm:mt-3 mb-4 sm:mb-5 
    overflow-auto 
    rounded-md sm:rounded-lg 
    shadow-md sm:shadow-lg 
    transition-all duration-300
  "
>

  <div className="relative overflow-hidden rounded-lg shadow-lg">
    <img
      src={productDetails?.image}
      alt={productDetails?.title}
      className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 hover:scale-105"
    />
  </div>
        <div className="">
  <div>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">{productDetails?.title}</h1>
    <p className="text-gray-500 text-sm sm:text-base md:text-lg mb-6">
      {productDetails?.description}
    </p>
  </div>
  <div className="flex items-center justify-between mb-4">
    <p
      className={`text-xl sm:text-2xl md:text-3xl font-bold text-red-600 ${
        productDetails?.salePrice > 0 ? "line-through" : ""
      }`}
    >
      ₹{productDetails?.price}
    </p>
    {productDetails?.salePrice > 0 && (
      <p className="text-xl sm:text-2xl md:text-2xl font-bold text-green-500">
        ₹{productDetails?.salePrice}
      </p>
    )}
  </div>
  <div className="flex items-center gap-2 mb-4">
    <StarRatingComponent rating={averageReview} />
    <span className="text-gray-500">({averageReview.toFixed(2)})</span>
  </div>
  <Button
    className="w-full py-3 sm:py-4 bg-black text-white hover:bg-gray-800 transition-all"
    onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
    disabled={productDetails?.totalStock === 0}
  >
    {productDetails?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
  </Button>
  <Separator 
  className="
    my-6 sm:my-4
    border-t border-gray-300 
    transition-all duration-300 
    hover:border-gray-500 
    shadow-sm hover:shadow-md
  " 
/>

  <div className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-auto">
    <h2 className="text-lg sm:text-xl font-bold mb-4">Reviews</h2>
    <div className="space-y-4 sm:space-y-6">
      {reviews && reviews.length > 0 ? (
        reviews.map((reviewItem) => (
          <div className="p-3 sm:p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <Avatar className="w-8 sm:w-10 h-8 sm:h-10 border">
                <AvatarFallback>
                  {reviewItem?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{reviewItem?.userName}</h3>
                <StarRatingComponent rating={reviewItem?.reviewValue} />
              </div>
            </div>
            <p className="text-gray-600">{reviewItem.reviewMessage}</p>
          </div>
        ))
      ) : (
        <h1>No Reviews</h1>
      )}
    </div>
    <div className="mt-6 sm:mt-8">
      <Label className="block text-base sm:text-lg mb-2">Write a Review</Label>
      <div className="flex items-center gap-1 sm:gap-2 mb-4">
        <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
      </div>
      <Input
        className="mb-4"
        value={reviewMsg}
        onChange={(event) => setReviewMsg(event.target.value)}
        placeholder="Share your experience..."
      />
      <Button
        className="w-full bg-black text-white hover:bg-green-500 transition-all"
        onClick={handleAddReview}
        disabled={reviewMsg.trim() === ""}
      >
        Submit Review
      </Button>
    </div>
  </div>
</div>

      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
