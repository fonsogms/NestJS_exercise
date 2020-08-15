import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
//aqui conectamos todo lo que vayamos a usar, en este caso la configuracion de typeorm para conectar a nuestra base de datos
// Y nuestros modulos
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PassportModule,
  ],
})
export class AppModule {}
