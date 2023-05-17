import {Router} from "express";
import { productsCart } from '../utils/instances.js';

const routerCart = Router();
//const productsCart = new cartManager ('./src/carts');

routerCart.post ("/", async (req, res) =>{
    const { cid } = req.body;
    res.send (await productsCart.addCart(cid));
})
routerCart.get ("/", async (req, res) =>{
res.send (await productsCart.getCart());
})
routerCart.get('/:cid', async (req, res) => {
    let cid = parseInt(req.params.cid);
    // guardo en una variale los ID de los productos cargados en la class productmanager para luego validar mas abajo
    let gettingId = await productsCart.getCartById(cid);
    // aca valido el Id que se puso en en endpoint si esta lo muestro en pantalla si no mustro un error
    if (gettingId) {
      res.send(await gettingId);
    } else {
      res.send("ID carrito no encontrado");
    }
  });
routerCart.post ('/:cid/products/:pid', async (req, res)=>{
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    res.send (await productsCart.addProductCart(cartId, productId));
}) 


export default routerCart;