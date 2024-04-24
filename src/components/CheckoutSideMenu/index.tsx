import { useShoppingCartContext } from "../../context";
import { Link } from "react-router-dom";
import OrderCart from "../OrderCart";
import { totalPrice, getDateTime } from "../../utils";
import "./styles.css";
import { Order } from "../../models/Order";

const CheckoutSideMenu = () => {
    const {isCheckoutSideMenuOpen, closeCheckoutSideMenu, cartProducts, setCartProducts, order, setOrder, setSearchByTitle} = useShoppingCartContext();

    const handleDelete = (id: number) => {
        const newCartProducts = cartProducts.filter((product) => product.id !== id);
        setCartProducts(newCartProducts);
    }

    const handleCheckout = () => {
        const orderToAdd : Order = {
            date: getDateTime(),
            products: cartProducts,
            totalProducts : cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        };

        setOrder([...order, orderToAdd]);

        setCartProducts([]);
        closeCheckoutSideMenu();
        setSearchByTitle("");
    }
    
    return (
        <aside className={`${isCheckoutSideMenuOpen ? "flex" : "hidden"} w-[360px] h-[calc(100vh-68px)] top-[68px] flex flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className="font-medium text-xl">My Order</h2>
                <div onClick={closeCheckoutSideMenu} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className="px-6 overflow-y-scroll flex-1">
                {cartProducts.map((product) => (
                    <OrderCart 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        images={product.images}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="px-6 mb-6">
                <p className="flex justify-between items-center mb-2">
                    <span className="font-light">Total:</span>
                    <span className="font-medium text-xl">${totalPrice(cartProducts)}</span>
                </p>
                <Link to={"/my-orders/last"}>
                    <button className={`${cartProducts.length > 0 ? "inline-block" : "hidden"} w-full bg-black py-3 text-white rounded-lg`} onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    );
}

export default CheckoutSideMenu;