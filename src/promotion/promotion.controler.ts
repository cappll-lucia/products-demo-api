import {Request, Response, NextFunction} from 'express';
import { orm } from '../shared/db/orm.js';
import { Promotion } from './promotion.entity.js';

const em = orm.em;

export async function findAll(req: Request, res: Response){
    try {
        const promotions = await em.find(Promotion, {});
        res.status(200).json({message: 'Promotions found', data: promotions});
    } catch (error: any) {
        res.status(500).json({message: 'Error while fetching promotions', error: error.message});
    }
}
export async function findOne(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id);
        const promotion = await em.findOneOrFail(Promotion, {id});
        res.status(200).json({message: 'Promotion found', data: promotion})
    } catch (error: any) {
        res.status(500).json({message: 'Error while fetching promotions', error: error.message});
    }
}


export async function add(req: Request, res: Response){
    try {
        const promotion = em.create(Promotion, req.body);
        await em.flush();
        res.status(201).json({message: 'Promotion successfully created', data: promotion})
    } catch (error: any) {
        res.status(500).json({message: 'Error at promorion creation', error: error.message});
    }
}

export async function update(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id);
        const promotion = em.getReference(Promotion, id);
        em.assign(promotion, req.body);
        await em.flush();
        res.status(200).json({message: 'Promotion successfully updated', data: promotion})
    } catch (error: any) {
        res.status(500).json({message: 'Error while fetching promotions', error: error.message});
    }
}

export async function remove(req: Request, res: Response){
    try {
        const id = Number.parseInt(req.params.id);
        const promotion = em.getReference(Promotion, id);
        await em.removeAndFlush(promotion);
        res.status(200).json({message: `Promotion with id=${id} successfully deleted`});
    } catch (error: any) {
        res.status(500).json({message: 'Error while deleting promotion', error: error.message});
    }
}