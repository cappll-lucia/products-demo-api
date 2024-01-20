import { Entity, Collection, Property, ManyToMany, Cascade } from "@mikro-orm/mysql";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()
export class Promotion extends BaseEntity{
    @Property()
    title!: string

    @Property()
    description?: string

    @Property()
    discountPercent!: number
    
    @ManyToMany(()=> Product, (product)=>product.promotions)
    products= new Collection<Promotion>(this)

}