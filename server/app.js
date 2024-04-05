const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const routes = require('./routes/note.routes')

const app = express()

const port = process.env.PORT ?? 5000

var corsOptions = {
  origin: ['http://localhost', 'http://192.168.31.162/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/note', routes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    const {
      MONGO_INITDB_ROOT_USERNAME: username,
      MONGO_INITDB_ROOT_PASSWORD: password,
      MONGO_HOST: host
    } = process.env
    const uri = `mongodb://${username}:${password}@${host}/notes?authSource=admin`
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("MongoDB conected")
    app.listen(
      port,
      console.log.bind(console, `Server has been started on port ${port}`)
    )
  } catch (e) {
    console.log("MongoDB connection failed: " + e.message)
  }
}

start()




