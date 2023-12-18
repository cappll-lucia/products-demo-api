import crypto from 'node:crypto';

export class Product{
    constructor(
        public name:string, 
        public description:string, 
        public categoryClass: string, 
        public price:number, 
        public discountClass: string|null,
        public id= crypto.randomUUID()
    ){}
}