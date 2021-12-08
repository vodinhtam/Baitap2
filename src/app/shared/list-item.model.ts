import { Product } from '../product/product.model';
export class ListItem{
    constructor(public product: Product, public quantity: number){}
}