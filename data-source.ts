import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/signup/signup.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Super',
  database: 'testdb',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

