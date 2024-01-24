import {Request, Response, NextFunction} from 'express';
import { orm } from '../shared/db/conn.orm.js';
import { Category } from './category.entity.js';
import { rmSync } from 'fs';

const em = orm.em;

export async function findAll(req: Request, res:Response){
    try{
        const categories = await em.find(Category, {});
        res.status(200).json({message: 'Categories found', data: categories});
    }catch(error: any){
        res.status(500).json({message:'Error while fetching categories', error: error.message});
    }
}

export async function findOne(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id);
        const category = await em.findOneOrFail(Category, {id});
        res.status(200).json({message: 'Category found', data: category})
    } catch (error: any) {
        res.status(500).json({message:'Error while fetching category', error: error.message});
    }
}

export async function add(req: Request, res:Response){
    try{
        const category = em.create(Category, req.body);
        await em.flush();
        res.status(201).json({message: 'Category successfully created', data: category})
    }catch(error: any){
        res.status(500).json({message:'Error at category creation',error: error.message})
    }
}

export async function update(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id);
        const category =  em.getReference(Category, id);
        em.assign(category, req.body);
        await em.flush();
        res.status(200).json({message:'Category successfully updated', data: category})
    }catch(error: any){
        res.status(500).json({message: 'Error while updating category', error: error.message});
    }
}

export async function remove(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id);
        const category = em.getReference(Category, id);
        await em.removeAndFlush(category);
        res.status(200).json({message: `Category with id=${id} successfully deleted`});
    }catch(error: any){
        res.status(500).json({message: 'Error while deleting category', error: error.message})
    }
}