// exportaciones
import express from 'express';
import routerProduct from "./router/product.routers.js"
import cartRouters from "./router/cart.routers.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerProduct);
app.use('/api/cart', cartRouters);

// Arranco el servidor
app.listen(8080, () => {
	console.log('esta escuchando el puerto 8080');    
});