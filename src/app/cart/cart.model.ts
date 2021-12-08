import { ListItem } from '../shared/list-item.model';

export class Cart{

    constructor(public id: string, public items: ListItem[]){
    }
}