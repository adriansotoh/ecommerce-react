import { Product } from "../../models/Product";
import { useShoppingCartContext } from "../../context";

const Card = ({product} : {product: Product}) => {
    const {openProductDetail, setProductToShow, setCartProducts, cartProducts, openCheckoutSideMenu, closeProductDetail, closeCheckoutSideMenu} = useShoppingCartContext();

    const showProduct = (product: Product) => {
        openProductDetail();
        setProductToShow(product);
        closeCheckoutSideMenu();
    }

    const addProductToCart = (event: React.MouseEvent<HTMLElement>,productData: Product) => {
        event.stopPropagation();
        openCheckoutSideMenu();
        closeProductDetail();
        setCartProducts([...cartProducts, productData]);
    }   

    const renderIcon = () => {
        const isProductInCart = cartProducts.some((productInCart) => productInCart.id === product.id);

        if(isProductInCart){
            return (
                <button 
                className="absolute top-0 right-0 flex justify-center items-center bg-green-400 w-6 h-6 rounded-full m-2 p-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </button>
            );
        }
        return (                
            <button 
                className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                onClick={(event) => {
                    addProductToCart(event,product);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        );
    }

    return(
        <div 
          className="bg-white cursor-pointer w-56 h-60 rounded-lg"
          onClick={() => showProduct(product)}
          >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{product?.category?.name}</span>
                <img className="w-full h-full object-cover rounded-lg" src={product.images?.[0]} alt="headphones" />
                {renderIcon()}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{product.title}</span>
                <span className="text-lg font-medium">{`$${product.price}`}</span>
            </p>
        </div>
    );
}

export default Card;