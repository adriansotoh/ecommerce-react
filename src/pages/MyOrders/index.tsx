import OrdersCart from "../../components/OrdersCard";
import { Link } from "react-router-dom";
import { useShoppingCartContext } from "../../context";

function MyOrders() {
  const { order } = useShoppingCartContext();

    return (
      <>
        <div className="flex items-center justify-center relative w-80 mb-4">
          <h1 className="font-medium text-xl">My Orders!</h1>
        </div>
        {order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCart 
              totalPrice={order.totalPrice} 
              totalProducts={order.totalProducts}
              orderDate={order.date}
            />
          </Link>
        ))}
      </>
    )
  }
  
export default MyOrders