import mongoose from 'mongoose'
const Schema  = mongoose.Schema({
   path:{
       type:String,
       required:true
   }
});
export default mongoose.model("File",Schema)