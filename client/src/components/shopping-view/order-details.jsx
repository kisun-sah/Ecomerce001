/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  

  return (
    <DialogContent className="max-w-full sm:max-w-[800px] h-full overflow-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Order ID</p>
            <Label className="text-md text-gray-600">{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Order Date</p>
            <Label className="text-md text-gray-600">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Order Price</p>
            <Label className="text-md text-gray-600">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Payment Method</p>
            <Label className="text-md text-gray-600">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Payment Status</p>
            <Label className="text-md text-gray-600">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 rounded-full ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500 text-white"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="my-4" />
        
        <div className="grid gap-4">
          <div className="font-medium text-lg">Order Details</div>
          <ul className="grid gap-3">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ? (
              orderDetails?.cartItems.map((item) => (
                <li key={item.title} className="flex items-start justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img  src={item?.image} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
                    <div>
                      <span className="block font-semibold">{item.title}</span>
                      <span className="block text-sm text-gray-500">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-md font-semibold"> ₹{item.price}</span>
                </li>
              ))
            ) : (
              <p>No items in this order.</p>
            )}
          </ul>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid gap-4">
          <div className="font-medium text-lg">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground text-sm">
            <span>{user.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            {orderDetails?.addressInfo?.notes && <span>{orderDetails?.addressInfo?.notes}</span>}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
