/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { addressFormControls } from "../config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useToast } from "../ui/use-toast";
import AddressCard from "./address-card";

// Initial address form data
const initialAddressFormData = {
  fullName: "",
  phone: "",
  address: "",
  pincode: "",
  city: "",
  state: "",
  country:"",  
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
       
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      fullName:getCuurentAddress?.fullName,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      state: getCuurentAddress?.state,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
    <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg bg-white shadow-lg rounded-lg border border-gray-2">
  {addressList && addressList.length > 0
    ? addressList.map((singleAddressItem) => (
        <AddressCard
          key={singleAddressItem.id}
          selectedId={selectedId}
          handleDeleteAddress={handleDeleteAddress}
          addressInfo={singleAddressItem}
          handleEditAddress={handleEditAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
      ))
    : <p className="text-center text-gray-500">No addresses available</p>}
</div>

      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit " :"Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()} // Disable button if form is invalid
        />
      </CardContent>
    </Card>
  );
}

export default Address;
