import ProductsManager from '../controllers/productManagerV3.js';
import cartManager from '../controllers/cartManager.js';

export const productList = new ProductsManager();
export const productsCart = new cartManager();