import {makeExecutableSchema} from 'graphql-tools'
import resolvers from './resolvers'
const typeDefs = `
type Student{
    name:String!
    age:Int!
}    
type Welcome{
    msg:String
}
type Query{
    welcome:String
    allStudents:[Student]
},
type Mutation{
    createStudent(name:String!,age:Int!):Student
 }
`
const Schema = makeExecutableSchema({typeDefs,resolvers});
export default Schema
    