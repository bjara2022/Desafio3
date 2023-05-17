import {Router} from "express";
import { productList } from '../utils/instances.js';
import { io } from '../utils/socket.js';

const   routerProduct = Router();
//genero la nueva instancia de classe pero desde routers


routerProduct.post('/', async (req,res)=>{
	const { title, description, price, thumbnail, code, stock } = req.body;
	res.send(await productList.addProduct(title, description, price, thumbnail, code, stock));
	console.log("Producto agregado");
	io.emit('product_list_updated', await productList.addProduct());
  })
  
//Obtengo el listado de productos (ya cargados para la pruebas)
routerProduct.get('/', async (req, res) => {
	try {
		const show = await productList.getProducts();
		let limit = parseInt(req.query.limit);
		// valido si el usuario cargo limite de productos a mostrar, si no muestro todos los productos
		if (!limit) {
			return res.send({ show });
		} else {
			let productLimit = show.slice(0, limit);
			res.send({ productLimit });
		}
	} catch (error) {
		console.log(error);
	}
});

// busco por endpoint un ID en la lista de productos
routerProduct.get('/:pid', async (req, res) => {
    let id = parseInt(req.params.pid);
    // guardo en una variale los ID de los productos cargados en la class productmanager para luego validar mas abajo
    let gettingId = await productList.getProductById(id);
    // aca valido el Id que se puso en en endpoint si esta lo muestro en pantalla si no mustro un error
    if (gettingId) {
      res.send(gettingId);
    } else {
      res.send("ID de producto no encontrado");
    }
  });

routerProduct.delete ('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const deletedProduct = await productList.deleteProduct(id);
  
	if (deletedProduct) {
	  res.send(deletedProduct);
	  io.emit('product_list_updated', await productList.getProducts());
	} else {
	  res.status(404).send({ error: "ID de producto no encontrado" });
	}
  });


routerProduct.put('/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	const newmodificate = req.body;
	const updateProduct = await productList.updateProduct(id, newmodificate);
	if (updateProduct) {
	  res.send(updateProduct);
	} else {
	  res.status(404).send({ error: "el producto no Existe"});
	}
  });

  export default routerProduct;