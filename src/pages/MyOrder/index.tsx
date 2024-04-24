import { useShoppingCartContext } from "../../context";
import OrderCart from "../../components/OrderCart";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../models/Product";
import { totalPrice } from "../../utils";

function MyOrder() {
    const { order } = useShoppingCartContext();
    const {id} = useParams();
    let index = id ? Number(id) : order.length - 1;

    return (
      <>
        <div className="flex items-center justify-center relative w-80 mb-6">
          <Link to={"/my-orders"} className="absolute left-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <h1 className="font-medium text-xl">My Order</h1>
        </div>
        <div className="flex flex-col w-80">
          {order[index].products.map((product : Product) => (
            <OrderCart 
              key={product.id}
              id={product.id}
              title={product.title}
              images={product.images}
              price={product.price}
            />
          ))}
        </div>
        <div className="w-80 mb-6">
            <p className="flex justify-between items-center mb-2">
                <span className="font-light text-lg">Total:</span>
                <span className="font-medium text-xl">${totalPrice(order[index].products)}</span>
            </p>
        </div>
      </>
    )
  }
  
  export default MyOrder