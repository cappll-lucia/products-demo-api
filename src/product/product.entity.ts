import {Entity, Property, ManyToOne, ManyToMany, Collection, Cascade, Rel} from '@mikro-orm/core';
import {BaseEntity} from '../shared/db/baseEntity.entity.js'; 
import { Promotion } from '../promotion/promotion.entity.js';
import { Category } from '../category/category.entity.js';

@Entity()
export class Product  extends BaseEntity{
    @Property({nullable: false})
    name!: string
    
    @Property({nullable: false})
    description!:string
    
    @ManyToOne(()=> Category, {nullable: false})
    category!: Rel<Category>
    
    @Property({nullable: false})
    price!:number
    
    @ManyToMany(()=> Promotion, (promotion)=>promotion.products, {owner: true})
    promotions!: Promotion[]

}