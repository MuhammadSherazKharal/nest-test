import 'reflect-metadata';
import { AppDataSource } from './data-source';
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connection successful!');
    return AppDataSource.destroy(); // close the connection cleanly
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
  });
