import fs from 'fs-extra'
import Students from '../models/students'
const schemaFile = JSON.parse(fs.readFileSync('./schema.json', 'utf8'));
const resolvers = {
    Query:{
        welcome:(_,data,context,info)=>{
            return "welcome to graphql code lab session"
        },
        allStudents:async(_,data,context,info)=>{
             return Students.find()

        }
    },
    Mutation:{
        createStudent:async(_,data,context,info)=>{
            const student = await Students.create(data)
            return student
        }
    }

};

export default resolvers