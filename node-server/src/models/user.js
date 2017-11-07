import mongoose from 'mongoose'
import config from '../../config';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true ,
        trim:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    isSuperUser:{
        type:Boolean
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Role"

    }
});
userSchema.set('validateBeforeSave', false);
userSchema.path('password').validate((password)=>{
    return (password.length > 7)
});

userSchema.statics = {
    register:async function register(data){

        const  user = new User(data);
        await user.validate()
        user.password = bcrypt.hashSync(data.password);
        const savedData =  await user.save();

        return savedData
    },
    emailLogin:async(data)=>{
        var user = await User.findOne({email:data.email}).exec();
        if(user.validatePassword(data.password)){
            var Token = jwt.sign({_id:user._id},
                config.secret,{ expiresIn: 60*60*24*7 })
            return{token:Token,username:user.username,email:user.email,id:user._id}
        }else{
            throw new Error("user not found")
        }

    },

    usernameLogin:async(data)=>{
        var user = await User.findOne({username:data.username}).exec();
        if(user.validatePassword(data.password)){
            var Token = jwt.sign({_id:user._id},
                config.secret,{ expiresIn: 60*60*24*7 })
            return{token:Token,username:user.username,email:user.email,id:user._id}
        }else{
            throw new Error("password is not correct")
        }



    }
};
userSchema.methods={
    validatePassword: function(password) {
        if(this){
            return bcrypt.compareSync(password, this.password);


        }else{
            throw new Error("user not found")
        }

    },
    takeRole:async function(id){
        this.role = id
        return await this.save()
    }

};
const User = mongoose.model("User",userSchema);
export default User