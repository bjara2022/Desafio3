import ProductsManager from '../dao/controllers/productControlers.js';
import cartManager from '../dao/controllers/cartControllers.js';

export const productList = new ProductsManager();
export const productsCart = new cartManager();