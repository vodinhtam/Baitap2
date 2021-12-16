import { ListItem } from '../model/list-item.model';

export class Cart{

    constructor(public username: string, public items: ListItem[]){
    }
}