import fs from 'fs';
import { productList } from '../utils/instances.js';
export default class cartManager {
    constructor() {
        this.path = './src/carts.json';
        
      }
      
    #cid = 0;
    #writeCart = async (products) => {
		await fs.promises.writeFile(this.path, JSON.stringify(products));
	};
    #readCart= async () => {
        const readCart = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(readCart);
    };
    
getCart = async () => {
        const products = await this.#readCart();
        console.log (products);
        return products;
        
        };    

addCart= async () => {
          const products = await this.#readCart();
          const id = this.#incrementId();
          const cart = { id, products: [] };
          products.push(cart);
          await this.#writeCart(products);
          console.log(products);
          return products;
          }
#incrementId() {
     this.#cid++;
    return this.#cid;
  }       
getCartById = async (id) => {
    const carts = await this.#readCart();
    const index = await carts.findIndex((cart) => cart.id === id);
    if (index === -1) {
      console.log('ID no encontrada');
      return;
    }
    // Muestro el producto solicitado
    console.log('Carrito Encontrado!');
    return carts[index];
  };
  addProductCart = async (cartId, productId) => {
    let carts = await this.#readCart();
    const index = await carts.findIndex((cart) => cart.id === cartId);
    if (index === -1) {
      console.log('carrito no encontrado');
      return;
    }
    let productById = await productList.getProductById(productId);
    if (!productById) {
      console.log('producto no encontrado');
      return;
    }
    let cart = carts[index];
    let productIndex = cart.products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
      cart.products.push({ id: productById.id, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    await this.#writeCart(carts);
    console.log(carts);
    return "Producto en carrito";
  };
        
};

