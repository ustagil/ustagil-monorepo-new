import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@172.17.0.1:27017'),
    TodoModule,
  ],
})
export class AppModule {}
