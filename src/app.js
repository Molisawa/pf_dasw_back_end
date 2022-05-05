import express, { json } from 'express';
import pkg from 'mongoose';
const { Promise, connect } = pkg;
import dotenv from 'dotenv'
import cors from 'cors';
import {createRoles} from './libs/initialSetup';

import userRouter from './routes/user.routes';
import movieRouter from './routes/movie.routes';
import studioRouter from './routes/studio.routes';
import categoryRouter from './routes/category.routes';
import actorRouter from './routes/actor.routes';
import directorRouter from './routes/director.routes';
import authRouter from './routes/auth.routes';
dotenv.config()
const app = express()
app.use(cors())
createRoles();
const port = process.env.PORT || 3000

// middleware
app.use(json());

// call routes 

app.use('/api/v1', userRouter)
app.use('/api/v1', movieRouter)
app.use('/api/v1', studioRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', actorRouter)
app.use('/api/v1', directorRouter)
app.use('/api/v1', authRouter)


//mongodb connection
// Promise = global.Promise;

connect(process.env.MONGODB_URI)
    .then(() => { console.log('Database is connected') })
    .catch(err => { console.log('Can not connect to the database' + err) });




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
