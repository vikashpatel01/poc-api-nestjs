import {Order} from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class OrderEntity implements Order {

    @ApiProperty()
    orderId: number

    @ApiProperty()
    orderNumber: string

    @ApiProperty()
    customerId: string

    @ApiProperty()
    customerName: string

    @ApiProperty()
    enquiryId: string

    @ApiProperty()
    orderDate: Date

}
