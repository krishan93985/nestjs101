import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.entity";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";

@Module({
    imports:[
        MongooseModule.forFeature([ //import schema and define models that needs to be injected in this module anywhere
            {
                name:'User',
                schema:UserSchema
            }
        ])
    ],
    controllers:[UserController],
    providers:[UserService]
})
export class UserModule {};