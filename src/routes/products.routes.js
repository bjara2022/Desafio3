import { Router } from 'express';
import { productsService } from '../dao/products.service.js';
import { io } from '../utils/socket.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
	try {
		const {limit,page,sort,query} = req.query

		//let limit = parseInt(req.query.limit) || 10;
		//let page = parseInt(req.query.page) || 1;
		//let sort = req.query.sort;
		//let query = req.query.query;
// Guardo lo filtrado
		let filter = {};
// Filtro para query		
		if (query) {
			filter.type = query;
		}
		const totalCount = await productsService.getProductCountMdb(filter);
// Calculo para indexacion 
		let startIndex = (page - 1) * limit;
		let endIndex = page * limit;

		const products = await productsService.getProductsMdb(filter, limit, startIndex);

// Ordenar productos
		if (sort) {
			products.sort((a, b) => {
				if (sort === 'asc') {
					return a.price - b.price;
				} else if (sort === 'desc') {
					return b.price - a.price;
				} else {
					return 0;
				}
			});
		}

		res.send({ products, totalCount });
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.get('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		const product = await productsService.getProductByIDMdb(pid);
		res.send(product);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.post('/', async (req, res) => {
	const product = req.body;
	try {
		const productAdd = await productsService.addProductMdb(product);
		res.send(productAdd);
		io.emit(
			'product_list_updated',
			await productsService.getAllProductsMdb()
		);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.put('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		const product = await productsService.updateProductMdb(pid, req.body);
		res.status(201).send(product);
	} catch (err) {
		res.status(500).send({ err });
	}
});

productsRouter.delete('/:pid', async (req, res) => {
	const pid = req.params.pid;
	try {
		await productsService.removeProductMdb(pid);
		res.sendStatus(204);
		io.emit(
			'product_list_updated',
			await productsService.getAllProductsMdb()
		);
	} catch (err) {
		res.status(500).send({ err });
	}
});

export default productsRouter;