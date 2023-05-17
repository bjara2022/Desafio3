const socket = io();

const render = async (data) => {
	const html = document.getElementById('productsList');
	html.innerHTML = '';
	await data.forEach((element) => {
		const elementHtml = document.createElement('div');
		elementHtml.innerHTML = ` <h2>Categoria: ${element.title}</h2>
    <p> Descripcion: ${element.description}</p>
    <p> Precio: ${element.price}</p>
    <p> Codigo: ${element.code}</p>
    <p> Stock:${element.stock}</p>
	<p> ID:${element.id}</p>
    ${element.thumbnail ? `<p> Imagen: ${element.thumbnail}</p>` : ''}
    `;
		html.appendChild(elementHtml);
	});
};

socket.on('product_list', (data) => {
	render(data);
});
socket.on('product_list_updated', (data) => {
	render(data);
});