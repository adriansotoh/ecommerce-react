import { Product } from "../../models/Product";

const OrderCart = (props: Product | any) => {
    const {id,title, images, price, handleDelete } = props;
    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className="w-20 min-w-20 h-20">
                    <img className="w-full h-full rounded-lg object-cover" src={images?.[0]} alt={title} />
                </figure>
                <p className="text-sm font-light">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-lg font-medium">{`$${price}`}</p>
                {
                    handleDelete && 
                    (<button onClick={() => handleDelete(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>  
                    </button>)
                }
            </div>
        </div>
    );
}

export default OrderCart;