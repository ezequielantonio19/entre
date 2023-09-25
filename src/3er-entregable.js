import express from 'express';
import { manager } from "./app.js";

const app = express();
app.use(express.json());

app.get("/productos", async (req, res) => {
  try {
    const productos = await manager.getProductos(req.query);
    res.status(200).json({ mensaje: "Producto encontrado", productos });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

app.get("/productos/:id", async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  try {
    const producto = await manager.getProductoPorId(+id);
    if (!producto) {
      return res
        .status(404)
        .json({ mensaje: "No existe el producto" });
    }
    res.status(200).json({ mensaje: "Producto existente", producto });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080");
});