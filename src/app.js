import express from 'express';
import usuarioRouter from "./routes/usuarioRoutes.js"

const app = express();
app.use(express.json());
app.use("/api",usuarioRouter);


export default app;