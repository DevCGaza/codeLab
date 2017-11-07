import express from 'express'
    import busboy from 'connect-busboy'
    import uuidv4 from 'uuid/v4'
    import path from 'path'
    import fs from 'fs-extra'
    import File from '../models/fileModel.js'
    import Jimp from 'jimp'
    
const router = express.Router();
router.get('/', (req, res) => {
    res.send('welcome ,, this is an graphql endpoint ,, go to /graphql to start using it !')
});


    router.get("/download/:id",async(req,res,next)=>{
    const file = await File.findOne({_id:req.params.id}).exec()
    if(file){
        res.download(__dirname + '/../../uploaded_files/' + file.path)
    }else{
        res.send("sorry file not found");
    }
})
    module.exports = router;