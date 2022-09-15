import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class UpdateOrderDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty()
    customerName: string;
}
