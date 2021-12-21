import { Order } from './order.model';
export class Account{
    
    constructor(public username: string, public password: string, public isAdmin: boolean, public orders: Order[]){}
}