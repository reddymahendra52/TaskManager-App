const express = require('express')
const app = express();
const connectDB = require('./db/connection')
const notFound = require('./middleware/not-found')
require('dotenv').config()


// importing routes
const tasks = require('./routes/tasks')

// middleware for json data
app.use(express.static('./public'))
app.use(express.json())


// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)


const port = 3000;


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()



