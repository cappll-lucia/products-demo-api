import 'reflect-metadata';
import express from 'express';
import { productRouter } from './product/product.routes.js';
import { categoryRouter } from './category/category.routes.js';
import { promotionRouter } from './promotion/promotion.routes.js';
import {orm, syncSchema} from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/mysql';


const app = express();
app.use(express.json()); //middleware para parsear el body de las request a json

//desp de middlewares base (json o cors)

app.use((req, res, next)=>{
    RequestContext.create(orm.em, next);
});


//antes de rutas y middlewares de negocio

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/promotions', promotionRouter);

app.use((_, res)=>{
    res.status(404).send({message: 'Resource not found'});
})


await syncSchema(); //NEVER IN PRODUCTION

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}/`)
})