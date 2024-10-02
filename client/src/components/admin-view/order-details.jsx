/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);



  function handleUpdateStatus(event) {
    event.preventDefault();
    //const { status } = formData;

    // dispatch(
    //   updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    // ).then((data) => {
    //   if (data?.payload?.success) {
    //     dispatch(getOrderDetailsForAdmin(orderDetails?._id));
    //     dispatch(getAllOrdersForAdmin());
    //     setFormData(initialFormData);
    //     toast({
    //       title: data?.payload?.message,
    //     });
    //   }
    // });
  }


  return (
    <DialogContent className="sm:max-w-[800px] sm:max-h-[700px] overflow-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid gap-6">
        {/* Order Information */}
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Order Information</h3>
          <div className="flex flex-wrap items-center justify-between">

          <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Order IMg</p>
              <Label className="text-gray-700">{orderDetails?.img}</Label>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Order ID</p>
              <Label className="text-gray-700">{orderDetails?._id}</Label>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Order Date</p>
              <Label className="text-gray-700">
                {orderDetails?.orderDate.split("T")[0]}
              </Label>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Order Price</p>
              <Label className="text-gray-700">${orderDetails?.totalAmount}</Label>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Payment Method</p>
              <Label className="text-gray-700">{orderDetails?.paymentMethod}</Label>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Payment Status</p>
              <Label className="text-gray-700">{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="w-full sm:w-1/2 mb-2">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 text-white rounded-full ${
                    orderDetails?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderDetails?.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Order Items</h3>
          <ul className="grid gap-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border p-2 rounded-md shadow-sm bg-gray-50"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <div className="grid gap-2 text-gray-700">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.fullName}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.state}</span>
            <span>{orderDetails?.addressInfo?.country}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        <Separator />

        {/* Order Status Form */}
        <div className="mt-6">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "Out for delivery", label: "Out for delivery" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
