import {Request, Response, NextFunction} from 'express';
import { ProductRepository } from './product.repository.js';
import { Product } from './product.entity.js';

const repository = new ProductRepository();

export function sanitizeProductInput(req: Request, res: Response, next:NextFunction){
    req.body.sanitizedProductInput ={
        name: req.body.name,
        description: req.body.description,
        categoryClass: req.body.categoryClass,
        price: req.body.price,
        discountClass: req.body.discountClass   
    }
    Object.keys(req.body.sanitizedProductInput).forEach(key=>{
        if(req.body.sanitizedProductInput[key]===undefined) delete req.body.sanitizedProductInput[key];
    })
    next();
}


export function findAll(req:Request, res:Response){
    res.json({data: repository.findAll()});
}

export function findOne(req:Request, res:Response){
    const product = repository.findOne({id: req.params.id});
    if(!product) return res.status(404).json({message: 'Product not found'});
    res.json({data:  product});
}

export function add(req: Request, res: Response){
    const input = req.body.sanitizedProductInput;
    const productInput = new Product(
        input.name, 
        input.description, 
        input.categoryClass, 
        input.price, 
        input.discountClass
    );
    const newProduct = repository.add(productInput);
    res.status(201).send({message: 'New product created', data: newProduct});
}


export function update(req: Request, res: Response){
    req.body.sanitizedProductInput.id = req.params.id;
    const updatedProduct = repository.update(req.body.sanitizedProductInput);    
    if(!updatedProduct) return res.status(404).send({message: 'Product not found'})
    res.status(200).send({message: 'Product updated successfully', data: updatedProduct})
}

export function remove(req: Request, res: Response){
    
    const deletedProduct = repository.remove({id: req.params.id});
    
    if(!deletedProduct) return res.status(404).send({message: 'Product not found'})
    res.status(200).send({message: 'Product deleted successfully'});
}