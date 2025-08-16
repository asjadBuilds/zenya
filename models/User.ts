import mongoose, { models } from "mongoose";
import bcrypt from 'bcrypt'
export interface IUser {
    _id:mongoose.Types.ObjectId
    name:string,
    email:string,
    password:string,
    avatar:string,
    createdAt:Date,
    updatedAt:Date
}

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = models?.User || mongoose.model<IUser>("User",userSchema);

export default User;