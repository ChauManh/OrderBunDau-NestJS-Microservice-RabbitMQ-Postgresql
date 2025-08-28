import { UserRole } from '@app/common/enum/user.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) phoneNumber: string;
  @Column({ select: false }) password: string;
  @Column() fullName: string;
  @Column({ type: 'enum', enum: UserRole }) role: UserRole;
  @Column({ default: true }) isActive: boolean;
}
