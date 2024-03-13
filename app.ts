import express from 'express';
import userRoute from './src/routes/userRoute';
import auth from './src/routes/authRoute';
import { closeDbConnection, openDbConnection } from './src/utils/db';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth', auth);


// Open the database connection before starting the server
(async () => {

    await openDbConnection();

    app.listen(port, () => console.log(`Listening on port ${port}...`));

})();


// Gracefully disconnect from MongoDB when the application is terminated
process.on('SIGINT', async () => {
    await closeDbConnection();
    
    process.exit(0);
});
