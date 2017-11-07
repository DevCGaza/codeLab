import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import {graphiqlExpress,graphqlExpress} from 'apollo-server-express'
import schema from './graphql'
import jwt from 'jsonwebtoken'
import config from '../config'
import User from './models/user'
require("babel-core/register");
require("babel-polyfill");
import router from './routes/index'
import busboy from 'connect-busboy'
let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));
app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/",(req,res,next)=>{
    if(!req.headers.authorization){
        req.user = undefined;
        next()
    }else{
        jwt.verify(req.headers.authorization,config.secret,function (err,decoded) {
            if(err){
                req.user = undefined;
                next();


            }else{
                User.findOne({_id:decoded._id}).exec(function (err,user) {
                    if(user.role){
                        User.findOne({_id:decoded._id}).populate("role").exec(function (err,Puser) {
                            req.user = Puser ;
                            next();
                        })
                    }
                    req.user = user ;
                    next();
                })



            }
        })
    }
});
app.use('/graphql', bodyParser.json(), graphqlExpress(
	request=>({schema,
		context:{user:request.user}})
	));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));
app.use("/",router)

// connect to db
initializeDb( db => {
	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
