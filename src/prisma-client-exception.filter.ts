import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {BaseExceptionFilter} from '@nestjs/core'
import {Prisma} from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    // const request = context.getRequest<Request>();
    
    // console.log(request.url);
  

    switch(exception.code){
      case 'P2025':
        let status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          statusCode: status,
          message: `Record with the given order number not found`
        });
      break;
      case 'P1001':
        status = HttpStatus.SERVICE_UNAVAILABLE;
        response.status(status).json({
          statusCode: status,
          message: `Service unavailable`
        });
        break;
      case 'P1008':
        status = HttpStatus.GATEWAY_TIMEOUT;
        response.status(status).json({
          statusCode: status,
          message: `Gateway timed out`
        })
      default:
        super.catch(exception, host);
        break;
    }
  }
}
