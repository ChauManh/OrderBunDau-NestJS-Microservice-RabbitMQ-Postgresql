import { Category } from 'apps/category/src/entities/category.entity';

export interface MenuItemResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  category: Category;
}
