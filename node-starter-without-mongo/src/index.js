import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import {graphiqlExpress,graphqlExpress} from 'apollo-server-express'
import schema from './graphql'

import config from '../config'

import router from './routes/index'

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/graphql', bodyParser.json(), graphqlExpress(
	request=>({schema})
	));
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));
app.use("/",router)



	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});

export default app;
