import { Router } from "express";
import {findAll, findOne, add, update, remove} from './categoty.controler.js';

export const categoryRouter = Router();

categoryRouter.get('/', findAll);
categoryRouter.get('/:id', findOne);
categoryRouter.post('/', add);
categoryRouter.put('/:id', update);
categoryRouter.patch('/:id', update);
categoryRouter.delete('/:id', remove);