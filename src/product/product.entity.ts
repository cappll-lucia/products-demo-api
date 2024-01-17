import crypto from 'node:crypto';

export class Product{
    constructor(
        public name:string, 
        public description:string, 
        public categoryId: string, 
        public price:number, 
        public id ?:number
    ){}
}