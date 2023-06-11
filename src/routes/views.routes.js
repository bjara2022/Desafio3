import { Router } from 'express';
import { productsService } from '../dao/products.service.js';



const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	const { limit, page, category } = req.query;
	const data = await productsService.getAllProductsMdb(
		limit,
		page,
		category
	);
	data.category = category;
	console.log(data)
	res.render('prueba', data);
});

viewsRouter.get('/products', async (req, res) => {
	try {
		const productsMdb = await productsService.getAllProductsMdb();
		res.render('prueba', productsMdb)
	} catch (err) {
		res.status(500).send({ err });
	}
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
	try {
		res.render('realTimeProducts', {
			title: 'Productos en tiempo real',
		});
	} catch (err) {
		res.status(500).send({ err });
	}
});


export default viewsRouter;