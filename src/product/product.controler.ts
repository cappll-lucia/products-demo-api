import {Request, Response, NextFunction} from 'express';
import {orm} from '../shared/db/conn.orm.js';
import { Product } from './product.entity.js';

const em = orm.em;

export function sanitizeProductInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedProductInput ={
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        promotions : req.body.promotions
    }
    Object.keys(req.body.sanitizedProductInput).forEach(key=>{
        if(req.body.sanitizedProductInput[key]===undefined) delete req.body.sanitizedProductInput[key];
    })
    next();
}


export async function findAll(req:Request, res:Response){
    try{
        const products = await em.find(Product, { }, { populate: ['category', 'promotions'] });
        res.status(200).json({message: 'Products found', data: products})
    }catch(error: any){
        res.status(500).json({message:'Error while fetching products', error: error.message})
    }
}

export async function findOne(req:Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id);
        const product = await em.findOneOrFail(Product, {id}, { populate: ['category', 'promotions'] });
        res.status(200).json({message: 'Product found', data: product})
    }catch(error: any){
        res.status(500).json({message:'Error while fetching product', error: error.message})
    } 
}

export async function add(req: Request, res: Response){
    try{
        const product = em.create(Product, req.body.sanitizedProductInput);
        await em.flush();
        res.status(201).json({message: 'Produc Successfully created', data: product})
    }catch(error: any){
        res.status(500).json({message:'Error al product creation', error: error.message})
    } 
}

export async function update(req: Request, res: Response){
    try{
        const id = Number.parseInt(req.params.id);
        const productToUpdate = await em.findOneOrFail(Product, {id});
        const updatedProduct = em.assign(productToUpdate, req.body.sanitizedProductInput);
        await em.flush();
        res.status(200).json({message: 'Product successfully updated', data: productToUpdate});
    }catch(error: any){
        res.status(500).json({message:'Error while updating product', error: error.message})
    } 
}

export async function remove(req: Request, res: Response){
    try{
        const id = Number.parseInt(req.params.id);
        const product = em.getReference(Product, id);
        await em.removeAndFlush(product);
        res.status(200).json({message: `Product with id=${id} successfully deleted`});
    }catch(error: any){
        res.status(500).json({message:'Error while deleting category', error: error.message})
    } 
}