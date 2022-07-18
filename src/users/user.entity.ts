import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    }
})

//by extending it to Document it carries various methods and fields of a mongoose document (@types/mongoose)
export interface User extends mongoose.Document {
    id:string,
    name:string,
    age:number
}

// export class User {
//     //automatically declares and sets these same name variables in 
//     //this class with the provided values during object creation
//     constructor(
//         public id:number,
//         public name:string,
//         public age:number
//     ) {}
// }