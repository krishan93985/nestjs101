import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://sploot-space-test:IOCIpvTpD7bhLy5K@cluster0.yxltt.mongodb.net/nest-learn?retryWrites=true&w=majority',
    ), //connecting db to root module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
