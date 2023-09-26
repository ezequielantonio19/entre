import express from 'express';
import { manager } from "./app.js";

const app = express();
app.use(express.json());

app.get("/productos", async (req, res) => {
  try {
    const products = await manager.getProduct(req.query);
    res.status(200).json({ mensaje: "Producto encontrado", products });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

app.get("/productos/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const product = await manager.getProductsById(+id);
    if (!product) {
      return res
        .status(404)
        .json({ mensaje: "No existe el producto" });
    }
    res.status(200).json({ mensaje: "Producto existente", product });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});