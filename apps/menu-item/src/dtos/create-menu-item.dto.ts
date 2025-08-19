export interface CreateMenuItemDto {
  name: string;
  description?: string;
  price: number;
  image?: string;
  isActive: boolean;
  categoryId: string;
}
