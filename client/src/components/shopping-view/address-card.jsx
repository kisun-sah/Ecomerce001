/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        {/* Display Full Name */}
        <Label className="font-bold">Name: {addressInfo?.fullName}</Label>
        
        {/* phone Lines */}
        <Label>Phone: {addressInfo?.phone}</Label>     

           {/* Address Lines */}
           <Label>Address: {addressInfo?.address}</Label>    

                   {/* Pincode */}
        <Label>Pincode: {addressInfo?.pincode}</Label>

        {/* City, State, Country */}
        <Label>City: {addressInfo?.city}</Label>
        <Label>State: {addressInfo?.state}</Label>
        {/* country  */}
        <Label>Country: {addressInfo?.country}</Label>

        {/* Notes */}
        {addressInfo?.notes && <Label>Notes: {addressInfo?.notes}</Label>}
      </CardContent>

      <CardFooter className="p-3 flex justify-between">
        {/* Edit and Delete Buttons */}
        <Button className="text-white bg-black" onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button className="text-white bg-black"  onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
