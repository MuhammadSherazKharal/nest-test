import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {  User } from './src/signup/signup.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '192.168.1.22',
  port: 5432,
  username: 'postgres',
  password: '123123',
  database: 'testdb',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

