import { Repository } from "../shared/repository.js";
import { Product } from "./product.entity.js";

const products: Product[] = [
    new Product(
        'Carpa Igloo 4D',
        'Plazas: 3  |   Medidas : 100 + 210 + 30 x 210 x140cm',
        'Camping',
        15000,
        'Sin descuento',
        'eedc30fe-9c03-44ed-9130-8dcc645cb177'
    ),
    new Product(
        'Anafe brogas',
        'Cocina de una hornalla que funciona a gas butano con carga descartable tradicional',
        'Camping',
        30000,
        '5%',
        '30186c31-4a1f-43d8-be37-ca78e3d8b2c8'
    ),
]

export class ProductRepository implements Repository<Product>{
    
    public findAll (): Product[] | undefined{
        return products;
    }

    public findOne(item: {id: string}): Product | undefined{
        return products.find((product)=>product.id===item.id);
    }

    public add(item: Product): Product | undefined{
        products.push(item);
        return item;
    }

    public update(item: Product): Product | undefined{
        const productIdx = products.findIndex((product)=>product.id===item.id);
        if(productIdx!=-1){
            products[productIdx]= {...products[productIdx], ...item};
        }
        return products[productIdx];
    }

    public remove(item:{id:string}): Product | undefined{
        const productIdx = products.findIndex((product)=>product.id===item.id);  
        if(productIdx!=-1){
            const deletedProduct = products[productIdx];
            products.splice(productIdx,1);
            return deletedProduct;
        }
    }

}