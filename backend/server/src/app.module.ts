import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://MWL:Mwl_20040419@cluster0.ti03rdz.mongodb.net/articlesdb?retryWrites=true&w=majority',
    ),
    ArticlesModule,
    UsersModule, 
  ],
})
export class AppModule {}