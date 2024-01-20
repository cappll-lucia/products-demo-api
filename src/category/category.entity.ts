import { Entity, Collection, Property, OneToMany, Cascade } from "@mikro-orm/mysql";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()
export class Category extends BaseEntity{

    @Property({nullable: false, unique: true})
    name!: string

    @Property({nullable: true})
    description?: string

    @OneToMany(()=> Product, product => product.category, {cascade: [Cascade.ALL]})
    products= new Collection<Category>(this)
}   