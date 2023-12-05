import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'DB_USER_NAME',
  password: 'DB_PASSWD',
  database: 'DB_NAME',
  entities: [Product],
  synchronize: true,
  logging: true,
};
