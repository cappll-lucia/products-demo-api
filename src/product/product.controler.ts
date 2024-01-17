import {Request, Response, NextFunction} from 'express';
import { ProductRepository } from './product.repository.js';
import { Product } from './product.entity.js';

const repository = new ProductRepository();

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
    res.json({data: await repository.findAll()});
}

export async function findOne(req:Request, res:Response){
    const product = await repository.findOne({id: req.params.id});
    if(!product) return res.status(404).json({message: 'Product not found'});
    res.json({data:  product});
}

export async function add(req: Request, res: Response){
    const input = req.body.sanitizedProductInput;
    const productInput = new Product(
        input.name, 
        input.description, 
        input.categoryId, 
        input.price, 
    );
    const newProduct = await repository.add(productInput);
    res.status(201).send({message: 'New product created', data: newProduct});
}


export async function update(req: Request, res: Response){
    req.body.sanitizedProductInput.id = req.params.id;
    const updatedProduct = await repository.update(req.body.sanitizedProductInput.id, req.body.sanitizedProductInput);    
    if(!updatedProduct) return res.status(404).send({message: 'Product not found'})
    res.status(200).send({message: 'Product updated successfully', data: updatedProduct})
}

export async function remove(req: Request, res: Response){
    
    const deletedProduct = await repository.remove({id: req.params.id});
    
    if(!deletedProduct) return res.status(404).send({message: 'Product not found'})
    res.status(200).send({message: 'Product deleted successfully'});
}