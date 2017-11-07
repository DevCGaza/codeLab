import  mongoose from 'mongoose'
const privilegesSchema = mongoose.Schema({
    tableName:{
        type:String,

        required:true
    },
    permissions:{
        type:[String]
    }
},{collection:"roles"});
const RolesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    privileges:{
        type:[privilegesSchema]
    }
});
export default mongoose.model("Role",RolesSchema)