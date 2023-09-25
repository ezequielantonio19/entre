import { existsSync, promises } from "fs";

const path = 'ProductsFile.json';

class ProductManager {
    constructor() {
        this.products = [];
    }

    async getProducts(queryObj) {
        const { limit } = queryObj;
        try {
            if (existsSync(path)) {
                const productsFile = await promises.readFile(path, 'utf-8');
                const productData = JSON.parse(productsFile);
                return limit ? productData.slice(0, +limit) : productData;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find((p) => p.id === id);
            if (!product) {
                return 'No existe Producto';
            } else {
                return product;
            }
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const newArrayProducts = products.filter((p) => p.id !== id);
            await promises.writeFile(path, JSON.stringify(newArrayProducts));
            console.log('El producto fue eliminado con éxito');
        } catch (error) {
            return error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                return 'Producto no encontrado';
            }
            updatedProduct.id = id;
            products[index] = updatedProduct;
            await promises.writeFile(path, JSON.stringify(products, null, 2));
            return products[index];
        } catch (error) {
            return error;
        }
    }

    async addProduct(product) {
        try {
            let { title, description, price, thumbnail, code, stock } = product;
            if (!title || !description || !price || !thumbnail || !stock || !code) {
                console.log("Completar todos los campos");
                return;
            }
            let products = await this.getProducts({});
            const id = !products.length ? 1 : products[products.length - 1].id + 1;
            const isCodeAlreadyAdded = products.some(prod => prod.code === code);
            if (isCodeAlreadyAdded) {
                console.log("Producto ya registrado");
                return;
            }
            const newProduct = { id, ...product };
            products.push(newProduct);
            await promises.writeFile(path, JSON.stringify(products));
            console.log('Producto agregado');
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export const manager = new ProductManager("ProductsFile.json");

/*const Product1 = {
    title: 'Pote 100gr',
    description: 'Pote de PAD con capacidad de 100gr',
    price: 25000,
    thumbnail: 'messi',
    code: 'p001',
    stock: 13000,
};

const Product2 = {
    title: 'Pote 1 kg',
    description: 'Pote de 1kg de PAD con tapa diámetro 96',
    price: 15000,
    thumbnail: 'suarez',
    code: 'p013',
    stock: 9000,
};

const Product3 = {
    title: 'Pico doble 1lt',
    description: 'Bidón con dosificador, con doble pico',
    price: 45000,
    thumbnail: 'ella',
    code: 'bl08',
    stock: 10000,
};

const Product4 = {
    title: 'Pico doble 1lt',
    description: 'Bidón con dosificador, con doble pico',
    price: 45000,
    thumbnail: 'ella',
    code: 'bl08',
    stock: 10000,
};

async function test() {
    const product = new ProductManager();
    await product.addProduct(Product1);
    await product.addProduct(Product2);
    await product.addProduct(Product3);
    await product.addProduct(Product4);
}

test();*/