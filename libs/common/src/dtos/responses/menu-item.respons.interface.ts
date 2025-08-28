import { Category } from 'apps/category/src/entities/user.entity';

export interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  category: Category;
}
