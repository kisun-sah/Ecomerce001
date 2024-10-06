/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { toast } from "../ui/use-toast";
import "../../style/adminOrder.css"

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  // Function to handle order deletion
  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Order deleted successfully!",
        });
        dispatch(getAllOrdersForAdmin()); // Refresh the order list after deletion
      } else {
        toast({
          title: "Failed to delete order.",
          variant: "destructive",
        });
      }
    });
  };


  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="shadow-lg rounded-lg p-6 bg-white">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold">All Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Order Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList && orderList.length > 0 ? (
            orderList.map((orderItem) => (
              <TableRow className="hover:bg-gray-100">
                <TableCell>{orderItem?._id}</TableCell>
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 badge ${
                      orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "rejected"
                        ? "bg-red-600"
                         : orderItem?.orderStatus === "delivered"
                        ? "bg-blue-600"
                         : orderItem?.orderStatus === "inShipping"
                        ? "bg-red-400"
                        : "bg-orange-500"
                    }`}
                  >
                    {orderItem?.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>₹{orderItem?.totalAmount}</TableCell>
                <TableCell>
                  <Dialog
                    open={openDetailsDialog}
                    onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails());
                    }}
                    className="dialog"
                  >
                    <Button
                      className="bg-black text-white rounded-lg hover:bg-gray-800"
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                    >
                      View Details
                    </Button>
                    <AdminOrderDetailsView orderDetails={orderDetails} />
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Button
                    className="bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => handleDeleteOrder(orderItem?._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : null}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  
  );

}

export default AdminOrdersView;