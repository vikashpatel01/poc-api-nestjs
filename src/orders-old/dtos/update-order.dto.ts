import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger/dist/decorators"

export class UpdateOrderDto{

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    customerName: string
}