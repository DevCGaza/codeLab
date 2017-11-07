import {makeExecutableSchema} from 'graphql-tools'
import resolvers from './resolvers'
const typeDefs = `
type Welcome{
    msg:String
}
type Query{
    welcome:String
}`
const Schema = makeExecutableSchema({typeDefs,resolvers});
export default Schema
    