import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
export const typeOrmConfig = (): TypeOrmModuleOptions => {
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      host: 'ec2-54-247-78-30.eu-west-1.compute.amazonaws.com',
      port: 5432,
      username: 'hujluciqizpeck',
      password:
        'b81d791efc4963d97454e6fb7a700f3ae66b426f4c604aa3eb1fe29fba9c9e13',
      database: 'd7c4gmgpaisna6',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'tito-1992',
      database: 'taskmanagement',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    };
  }
};
