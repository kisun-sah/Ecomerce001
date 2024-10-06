/* eslint-disable react/prop-types */
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/components/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto transition-transform transform hover:scale-105 hover:shadow-xl shadow-lg rounded-lg overflow-hidden">
    <div onClick={() => handleGetProductDetails(product?._id)}>
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4 bg-white">
      <h2 className="text-xl font-bold mb-2 text-gray-800">
  {product?.title.length > 18 ? `${product?.title.substring(0, 18)}...` : product?.title}
</h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product?.price)}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-green-900">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(product?.salePrice)}
            </span>
          ) : null}
        </div>
      </CardContent>
    </div>
    <CardFooter className="bg-white p-4">
      {product?.totalStock === 0 ? (
        <Button className="w-full opacity-60 cursor-not-allowed bg-gray-700 text-white">
          Out Of Stock
        </Button>
      ) : (
        <Button
          onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          Add to cart
        </Button>
      )}
    </CardFooter>
  </Card>
  
  );
}

export default ShoppingProductTile;
