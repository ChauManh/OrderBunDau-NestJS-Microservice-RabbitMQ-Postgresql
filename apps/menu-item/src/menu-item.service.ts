import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuItemService {
  getHello(): string {
    return 'Hello World!';
  }
}
