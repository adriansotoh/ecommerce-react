import { Product } from "../../models/Product";
import Card from "../../components/Card";
import ProductDetail from "../../components/ProductDetail";
import { useShoppingCartContext } from "../../context";

function Home() {
  const {products, setSearchByTitle, filteredProducts} = useShoppingCartContext();
  const renderView = () => {
    const productsToRender = filteredProducts && filteredProducts.length > 0 ? filteredProducts : products;

    if (!productsToRender || productsToRender.length === 0) {
      return (
        <div className="flex w-full items-center justify-center">
          <p>No hay producto con esas características</p>
        </div>
      );
    }

    return (
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {
          productsToRender && productsToRender.map((product: Product) => 
            (
              <Card product={product} key={product.id}/>
            )
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-2xl">Exclusive Products</h1>
      </div>
      <input 
        type="text" 
        placeholder="Search a product" 
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => {
          setSearchByTitle(event.target.value);
        }}/>
        {renderView()}
      <ProductDetail />
    </>
  )
}
  
export default Home