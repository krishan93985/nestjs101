import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    // private users : User[] = [new User(Math.random(),"Rashi",27)]
    
    //inject models
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    async getUsers() {
        return await this.userModel.find() as User[];
    }

    async insertUser(name:string, age:number){
        const newUser = new this.userModel({
            name,
            age
        })

        await newUser.save()
        console.log({newUser})
        return newUser.id as string;
    }

    async getUserById(id : string) {
        let foundUser;
        try{
            foundUser = await this.findUserById(id)
        } catch(error){
            console.log(error.message)
            throw new NotFoundException("Failed to get user by given id")
        }

        if(foundUser) return {
            id:foundUser.id,
            name:foundUser.name,
            age:foundUser.age,
         } as User;
        
        throw new NotFoundException("User not found with the given id")
    }

    async updateUser(id : string, name : string, age : number) {
        let updatedUser;
        try{
            // updatedUser = await this.userModel.findByIdAndUpdate(id,{
            //     name,
            //     age
            // },{new:true})
            // return updatedUser as User;

            //*****Alternate approach */
            updatedUser = await this.findUserById(id);

            if(!updatedUser) throw new NotFoundException("Failed to update user details")

            if(name) updatedUser.name = name;
            if(age) updatedUser.age = age;

            return await updatedUser.save();
        } catch(error){
            console.log(error.message)
            throw new NotFoundException("Failed to update user details")
        }
    }

    async deleteUser(id:string){
        try{
            await this.userModel.findByIdAndDelete(id) 
            return { message: "User Deleted Successfully" }
        } catch(error){
            console.log(error.message)
            throw new NotFoundException("Failed to delete User")
        }
    }

    private async findUserById(id:string) : Promise<User> {
        try{
            return await this.userModel.findById(id)
        } catch(error){
            console.log(error.message)
            throw new NotFoundException("Failed to update user details")
        }
    }
}