import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() : Promise<Array<User>> {
    return await this.userService.getUsers();
  }

  @Post(':x/:y')
  async addUser(
    @Body('name') name: string,
    @Body('age') age: number,
    @Param() params : any,
    @Param('x') x : number,
    @Param('y') y : number,
    ): Promise<string> {
      console.log({params,x,y});
        //Need to learn and implement DTO and ValidationPipe for request input validation
    const userId = await this.userService.insertUser(name, age);
    return userId;
  }

  @Get(':id')
  async getUser(
    @Param('id') userId : string,
  ): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id:string,
    @Body('name') name:string,
    @Body('age') age:number,
  ){
    return await this.userService.updateUser(id,name,age);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id:string,
  ){
      return await this.userService.deleteUser(id);
  }
}
