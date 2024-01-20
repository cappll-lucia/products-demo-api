import {Request, Response, NextFunction} from 'express';
import { Product } from './product.entity.js';


export function sanitizeProductInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedProductInput ={
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        price: req.body.price,
    }
    Object.keys(req.body.sanitizedProductInput).forEach(key=>{
        if(req.body.sanitizedProductInput[key]===undefined) delete req.body.sanitizedProductInput[key];
    })
    next();
}


export async function findAll(req:Request, res:Response){
    res.status(500).json({message: 'Not implemented'});
}

export async function findOne(req:Request, res:Response){
    res.status(500).json({message: 'Not implemented'});
}

export async function add(req: Request, res: Response){
    res.status(500).json({message: 'Not implemented'});
}


export async function update(req: Request, res: Response){
    res.status(500).json({message: 'Not implemented'});
}

export async function remove(req: Request, res: Response){
    res.status(500).json({message: 'Not implemented'});
}