import { readFile, writeFile } from "fs/promises";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class OrdersRepository{
    
    async findAll(){
        try {
            const contents = await readFile('orders.json', 'utf-8')
            const orders = JSON.parse(contents)
            return orders
        } catch (error) {
            throw new BadRequestException('Bad request')
        }
    }

    async findOne(orderNumber: string){
        try {
            const contents = await readFile('orders.json', 'utf-8')
            const orders = JSON.parse(contents)
            const singleOrder = orders.find((order) => order.orderNumber === orderNumber)
            
            if(!singleOrder){
                throw new Error()
            }
            return singleOrder
        } catch (error) {
            throw new NotFoundException(`No order with customer id ${orderNumber}`)
        }
    }

    async update(orderNumber: string, customerName: string){
        const contents = await readFile('orders.json', 'utf-8')
        const orders = JSON.parse(contents)
        const newOrders = orders.map((order)=>{
            if(order.orderNumber === orderNumber){
                return {...order, customerName}
            }
            return order
        })
        await writeFile('orders.json', JSON.stringify(newOrders))
    }
}