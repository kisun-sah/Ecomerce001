/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import "../../style/productsheet.css";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/components/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  
  // Local product list state to immediately reflect changes
  const [localProductList, setLocalProductList] = useState([]);

  const { productList = [] } = useSelector((state) => state.AdminProducts || {});
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all products initially and set to local state
    dispatch(fetchAllProducts()).then((fetchData) => {
      setLocalProductList(fetchData.payload);  // Updating local state
      console.log('Initial Fetch of Products:', fetchData);
    });
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();
  
    const action = currentEditedId !== null
      ? editProduct({ id: currentEditedId, formData })
      : addNewProduct({ ...formData, image: uploadedImageUrl });
  
    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        // Ensure localProductList is an array
        const safeLocalProductList = Array.isArray(localProductList) ? localProductList : [];
  
        // Log the current state for debugging
        console.log('Local Product List before update:', safeLocalProductList);
  
        // Optimistic UI Update
        const updatedProduct = currentEditedId !== null
          ? safeLocalProductList.map(product => 
              product.id === currentEditedId ? data.payload.product : product
            )
          : [...safeLocalProductList, data.payload.product];  // Add new product to local list
  
        setLocalProductList(updatedProduct);
  
        // Close the dialog and reset the form
        setOpenCreateProductsDialog(false);
        setFormData(initialFormData);
        setImageFile(null);
  
        toast({
          title: currentEditedId !== null ? "Product updated successfully" : "Product added successfully",
        });
        setCurrentEditedId(null);
  
        // Fetch all products to update Redux store and reflect changes globally
        dispatch(fetchAllProducts()).then((fetchData) => {
          // Assuming fetchData.payload is always an array
          setLocalProductList(fetchData.payload);  // Updating local state again after fetching
          console.log('Fetched Products After Add/Edit:', fetchData);
        });
      } else {
        toast({
          title: "Operation failed",
          description: data?.payload?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }
  

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        // Update local state immediately
        setLocalProductList(localProductList.filter(product => product.id !== getCurrentProductId));

        // Re-fetch products to ensure everything is synced
        dispatch(fetchAllProducts()).then((fetchData) => {
          setLocalProductList(fetchData.payload);  // Updating local state after fetch
          console.log('Fetched Products After Delete:', fetchData);
        });
      } else {
        toast({
          title: "Deletion failed",
          description: data?.payload?.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .every((key) => formData[key] !== "");
  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)} className="text-white bg-black">
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {localProductList && localProductList.length > 0
          ? localProductList.map((productItem) => (
              <AdminProductTile
                key={productItem.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : <div>No products available</div>}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-700 mb-4">
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
              className="space-y-6"
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
