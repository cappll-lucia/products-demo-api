import { Repository } from "../shared/repository.js";
import { Product } from "./product.entity.js";
import {pool} from '../shared/db/conn.mysql.js';
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ProductRepository implements Repository<Product>{
    
    public async findAll (): Promise< Product[] | undefined >{
        const [products] = await pool.query('select * from products');
        return products as Product[];
    }

    public async findOne(item: {id: string}): Promise< Product | undefined >{
        const id = Number.parseInt(item.id);
        const [products] = await pool.query<RowDataPacket[]>('select * from products where id = ?', [id]);
        if(products.length ===0) return undefined;
        const product = products[0] as Product;
        return product;

    }

    public async add(item: Product):  Promise< Product | undefined >{
        const {id, ...productRow} = item;
        const [result] = await pool.query<ResultSetHeader>('insert into products set ?', [productRow]);
        item.id = result.insertId;
        return item;
    }

    public async update(id: string, item: Product): Promise< Product | undefined >{
        await pool.query('update products set ? where id = ?', [item, id]);
        return item;
    }

    public async remove(item:{id:string}): Promise< Product | undefined >{
        try{
            const productToDelete = await this.findOne(item);
            const productId = Number.parseInt(item.id);
            await pool.query('delete from products where id = ?', [productId]);
            return productToDelete;
        }catch(err){
            throw new Error('Unable to delete product');
        }
        
    }

}