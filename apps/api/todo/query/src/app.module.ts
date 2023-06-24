import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { TodoModel, TodoSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@172.17.0.1:27017'),
    MongooseModule.forFeature([{ name: TodoModel.name, schema: TodoSchema }]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
