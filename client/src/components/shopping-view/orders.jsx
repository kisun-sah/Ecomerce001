import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { useState } from "react";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order IMG</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>IMG</TableCell>
              <TableCell>23534253454</TableCell>
              <TableCell>12/10/24</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>₹2435</TableCell>
              <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                  <DialogTrigger asChild>
                    <Button className="text-white bg-black">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ShoppingOrderDetailsView />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
