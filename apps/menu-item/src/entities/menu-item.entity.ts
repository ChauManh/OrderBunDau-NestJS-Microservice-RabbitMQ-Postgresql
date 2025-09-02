import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column({ nullable: true }) description: string;
  @Column('decimal', { precision: 10, scale: 0 }) price: number;
  @Column() image: string;
  // category?
  @Column({ default: true }) isActive: boolean;
  // uuid của category
  @Column() categoryId: string;
}
