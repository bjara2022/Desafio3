// exportaciones
import express from 'express';
import productManager from './productManagerV3.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
//genero la nueva instancia de classe pero desde la app
const productList = new productManager('./src/productos');
//Obtengo el listado de productos (ya cargados para la pruebas)
app.get('/products', async (req, res) => {
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
app.get('/products/:pid', async (req, res) => {
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

// Arranco el servidor
app.listen(8080, () => {
	console.log('esta escuchando el puerto 8080');    
});