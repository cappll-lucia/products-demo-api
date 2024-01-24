import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './promotion.controler.js';

export const promotionRouter = Router();

promotionRouter.get('/', findAll);
promotionRouter.get('/:id', findOne);
promotionRouter.post('/', add);
promotionRouter.put('/:id', update);
promotionRouter.patch('/:id', update);
promotionRouter.delete('/:id', remove);


