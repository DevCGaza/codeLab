import mongoose from 'mongoose'
import config from '../config'
export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${config.db}`,{
		useMongoClient:true
	});
	mongoose.Promise = global.Promise
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`connected to ${config.db} db`)
    });
	callback();
}
