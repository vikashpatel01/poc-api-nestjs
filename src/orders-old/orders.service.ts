import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {

    constructor(private ordersRepo: OrdersRepository){}

    findAll(){
        return this.ordersRepo.findAll()
    }

    findOne(orderNumber: string){
        return this.ordersRepo.findOne(orderNumber)
    }

    update(orderNumber: string, customerName: string){
        this.ordersRepo.update(orderNumber, customerName)
    }
}
