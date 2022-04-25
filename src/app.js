const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const userRouter = require('./routes/user.routes')
const movieRouter = require('./routes/movie.routes')
const studioRouter = require('./routes/studio.routes')
const categoryRouter = require('./routes/category.routes')
const actorRouter = require('./routes/actor.routes')
const directorRouter = require('./routes/director.routes')
const authRouter = require('./routes/auth.routes')

const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json());

// call routes 

app.use('/api/v1', userRouter)
app.use('/api/v1', movieRouter)
app.use('/api/v1', studioRouter)
app.use('/api/v1', categoryRouter)
app.use('/api/v1', actorRouter)
app.use('/api/v1', directorRouter)
app.use('/api/v1', authRouter)


//mongodb connection
mongoose.Promise = global.Promise;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => { console.log('Database is connected') })
    .catch(err => { console.log('Can not connect to the database' + err) });




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
