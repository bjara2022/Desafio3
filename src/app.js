// exportaciones
import express from 'express';
import handlerbars from 'express-handlebars';
import routerProduct from "./router/product.routers.js"
import cartRouters from "./router/cart.routers.js"
import viewsRoutes from './router/viewsRoutes.js'
import { server, app} from './utils/socket.js';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use('/', viewsRoutes);
app.use('/api/products', routerProduct);
app.use('/api/cart', cartRouters);

// Arranco el servidor
server.listen(8080, () => {
	console.log('esta escuchando el puerto 8080');    
});