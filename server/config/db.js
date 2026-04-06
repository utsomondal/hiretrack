require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@learning-cluster.4pttlh7.mongodb.net/?appName=learning-cluster`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let db

const connectDB = async () => {
  await client.connect()
  db = client.db('hiretrack')
  console.log('MongoDB Connected')
}

const getDB = () => {
  if (!db) throw new Error('DB not connected!')
  return db
}

module.exports = { connectDB, getDB }