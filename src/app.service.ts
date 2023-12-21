import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor (private configServices:ConfigService){
    
  }
  getHello(): string {
    return this.configServices.get("DATABASE_NAME");
  }
}
