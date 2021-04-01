import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
export class CatService{
  getCat(): string {
  	return 'Cat';
  }
}
