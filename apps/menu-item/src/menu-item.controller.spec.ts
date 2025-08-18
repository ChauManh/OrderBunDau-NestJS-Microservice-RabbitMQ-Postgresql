import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemController } from './menu-item.controller';
import { MenuItemService } from './menu-item.service';

describe('MenuItemController', () => {
  let menuItemController: MenuItemController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MenuItemController],
      providers: [MenuItemService],
    }).compile();

    menuItemController = app.get<MenuItemController>(MenuItemController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(menuItemController.getHello()).toBe('Hello World!');
    });
  });
});
