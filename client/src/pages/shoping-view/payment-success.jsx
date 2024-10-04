import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react"; // You can use an icon library

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-purple-200">
      <Card className="p-10 shadow-lg rounded-lg max-w-lg w-full text-center">
        <CardHeader className="p-0">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-4xl font-bold mb-2 text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your purchase!
        </CardContent>
        <Button 
          className="mt-5 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
