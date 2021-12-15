import { Product } from '../model/product.model';
export class ListItem{
    constructor(public product: Product, public quantity: number){}
}