import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';

dotenv.config()

@Module({
  imports: [UsersModule, AuthModule, TasksModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [User],
    synchronize: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
