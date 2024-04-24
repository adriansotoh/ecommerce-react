import { Product } from "../models/Product";

/**
 * 
 * @param {Product[]} products 
 * @returns {number} Total price
 */

export const totalPrice = (products: Product[]) => {
    return products.reduce((acc, product) => acc + product.price, 0);
};

export const getDateTime = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
        
    return dateTime;
}