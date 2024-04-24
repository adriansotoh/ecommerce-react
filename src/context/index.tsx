import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { PLATZI_API } from "../utils/endpoints";

type ShoppingCartContextType = {
    openProductDetail: () => void;
    closeProductDetail: () => void;
    isProductDetailOpen: boolean;
    productToShow: Product | null;
    setProductToShow: (product: Product) => void;    
    cartProducts: Product[];
    setCartProducts: (products: Product[]) => void;   
    isCheckoutSideMenuOpen: boolean;
    openCheckoutSideMenu: () => void;
    closeCheckoutSideMenu: () => void;  
    order: Order[];
    setOrder: (order: Order[]) => void;
    products: Product[] | null;
    searchByTitle: string;
    setSearchByTitle: (title: string) => void;
    filteredProducts: Product[] | null;
    searchByCategory: string;
    setSearchByCategory: (category: string) => void;
}

const DefaultShoppingCartContext = {
    openProductDetail: () => {},
    closeProductDetail: () => {},
    isProductDetailOpen: false,
    productToShow: null,
    setProductToShow: () => {},
    cartProducts: [],
    setCartProducts: () => {},
    isCheckoutSideMenuOpen: false,
    openCheckoutSideMenu: () => {},
    closeCheckoutSideMenu: () => {},
    order: [],
    setOrder: () => {},
    products: null,
    searchByTitle: '',
    setSearchByTitle: () => {},
    filteredProducts: null,
    searchByCategory: '',
    setSearchByCategory: () => {}
}

export const ShoppingCartContext = createContext<ShoppingCartContextType>(DefaultShoppingCartContext);

export const ShoppingCartProvider : React.FC<{children: ReactNode}> = ({children}) => {
    // Product Detail . Open Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState<boolean>(false);
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);

    // Checkout Side Menu . Open Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState<boolean>(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
    
    //Shopping Cart . Show Product
    const [productToShow, setProductToShow] = useState<Product | null>(null);

    //Shopping Cart . Add Products to cart
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    //Shopping Cart . Order
    const [order, setOrder] = useState<Order[]>([]);

    //Get Products
    const [products, setProducts] = useState<Product[] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(null);

    //Get Products by title
    const [searchByTitle, setSearchByTitle] = useState<string>('');

    //Get Products by title
    const [searchByCategory, setSearchByCategory] = useState<string>('');

    useEffect(() => {
        const abortController = new AbortController();
        const getProducts = async () => {
          try {
            const response = await fetch( `${PLATZI_API}/products`, {signal: abortController.signal, cache: "no-store"});
            if(response.ok){
              let prods = await response.json();
              setProducts(prods);
            }
          } catch (error) {
            setProducts(null);
          }
        }
        getProducts();

        return () => {
            abortController.abort();
        }
      }, []);

      const filterProductsByTitle = (items:Product[] | null, title: string) => {
        if(items === null) return [];
        return items.filter((item) => item.title.toLowerCase().includes(title.toLowerCase()));
      }

      const filterProductsByCategory = (items:Product[] | null, category: string) => {
        if(items === null) return [];
        return items.filter((item) => item.category?.name.toLowerCase() === category.toLowerCase());
      }

      const filterBy = (type: string, products: Product[] | null, searchByTitle: string, searchByCategory: string) => {
        if(type === "BY_TITLE"){
            return filterProductsByTitle(products, searchByTitle);
        }

        if(type === "BY_CATEGORY"){
            return filterProductsByCategory(products, searchByCategory);
        }

        if(type === "BY_CATEGORY_TITLE"){
            return filterProductsByTitle(filterProductsByCategory(products, searchByCategory), searchByTitle);
        }
        return products;
      }

      useEffect(() => {
        if(searchByCategory && !searchByTitle) setFilteredProducts(filterBy("BY_CATEGORY", products, searchByTitle, searchByCategory));
        if (searchByTitle && !searchByCategory) setFilteredProducts(filterBy("BY_TITLE", products, searchByTitle, searchByCategory));
        if (searchByTitle && searchByCategory) setFilteredProducts(filterBy("BY_CATEGORY_TITLE", products, searchByTitle, searchByCategory));
        if(!searchByCategory && !searchByTitle) setFilteredProducts(filterBy('', products, searchByTitle, searchByCategory));

        return () => {
        }
      }, [products, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            products,
            searchByTitle,
            setSearchByTitle,
            filteredProducts,
            searchByCategory,
            setSearchByCategory  
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext);