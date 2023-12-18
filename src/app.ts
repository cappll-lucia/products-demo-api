import express from 'express';
import { productRouter } from './product/product.routes.js';

const app = express();
app.use(express.json()); //middleware para parsear el body de las request a json


app.use('/api/products', productRouter)


app.use((_, res)=>{
    res.status(404).send({message: 'Resource not found'});
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}/`)
})