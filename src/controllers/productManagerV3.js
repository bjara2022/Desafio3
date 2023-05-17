import fs from 'fs';

export default class productManager {
  constructor() {
    this.path = './src/models/productos.json';
    }
    #id = 0;
    // Incremento mi variable privada en 1 cada vez que sumo un producto
    #incrementId() {
      this.#id++;
      return this.#id;
      }
    #readFile = async () => {
        const readProduct = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(readProduct);
    };
    #writeFile = async (products) => {
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    };

    //creo metodo para agregarproductos
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        // valido que todos los campos sean obligatorios
        if (title && description && price && thumbnail && code && stock) {
          
          // valido que el campo code no se repita
          const products = await this.#readFile();
          const validacion = products.find((product) => product.code === code);
          if (validacion) {
            console.log("El Code ya existe");
          
            // creo el producto
          } else {
            const product = {
              title,
              description,
              price,
              thumbnail,
              code,
              stock,
            };
            // agrego un campo a mi producto (ID) y luego incremeto con metodo privado
            product.id = this.#incrementId();
            // subo el producto al arreglo
            products.push(product);
            await this.#writeFile(products);
            console.log(products);
            return products;
          }
        } else {
          console.log("Faltan Campos");
        }
      };
  
  // Metodo para mostrar la listas de producto
  getProducts = async () => {
    const products = await this.#readFile();
    console.log (products);
    return products;
    
    };
// Metodo para mostrar la listas de producto por ID   
   getProductById = async (id) => {
      // Lee el archivo y busca el index para comparar con el ID y mostrar el array en consola
      const products = await this.#readFile();
      const index = await products.findIndex((products) => products.id === id);
      if (index === -1) {
        console.log('ID no encontrada');
        return;
      }
      // Muestro el producto solicitado
      console.log('Producto Encontrado!');
      return products[index];
    };
      // Metodo para modificar campos del producto y no el ID
  updateProduct = async (id, updatedProduct) => {
        const products = await this.#readFile();
        const index = products.findIndex((product) => product.id === id);
        if (index !== -1) {
          // Si se encontró el producto, actualiza el objeto completo del producto
          products[index] = {
            ...products[index],
            ...updatedProduct,
            id // no se borra
          };
          // aca vuelve a sobre escribir el archivo y muestra por consola cual ID se modifico
          await this.#writeFile(products);
          console.log(`Producto con ID ${id} actualizado`);
          console.log(products[index]);
          return products[index];
        } else {
          // Si no encuentra el ID arroja el error  
          console.log("ID de producto no encontrado");
        }
      };
      // Metodo para eliminar un producto
  deleteProduct = async (id) => {
        const products = await this.#readFile();
        const index = products.findIndex((product) => product.id === id);
        // Si encuentra el id lo borra de productos
        if (index !== -1) {
          products.splice(index, 1);
          //aca sobreescribe el archivo despues de eliminar el producto
          await this.#writeFile(products);
          console.log(`Producto con ID ${id} eliminado`);
        } else {
          // si no encuentra el ID arroja que no lo encontro   
          console.log("ID no encontrado");
        }
      };  
}