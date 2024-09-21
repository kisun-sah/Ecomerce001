/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product = {},  // Ensure product is an object even if undefined
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const { image, title, price, salePrice, _id } = product || {};

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={image || "/default-image.jpg"}  // Fallback image
            alt={title || "Product image"}  // Fallback title
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{title || "No Title"}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${price || "N/A"}  {/* Fallback price */}
            </span>
            {salePrice > 0 && (
              <span className="text-lg font-bold">${salePrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(_id);
              setFormData(product);
            }}
            disabled={!_id}  // Disable if no product ID
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(_id)}
            disabled={!_id}  // Disable if no product ID
            variant="destructive"  // Apply red styling for Delete
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
