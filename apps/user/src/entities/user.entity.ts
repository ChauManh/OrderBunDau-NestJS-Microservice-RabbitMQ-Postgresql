import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) phoneNumber: string;
  @Column() password: string;
  @Column() fullName: string;
  @Column({ type: 'enum', enum: UserRole }) role: UserRole;
  @Column({ default: true }) isActive: boolean;
}
