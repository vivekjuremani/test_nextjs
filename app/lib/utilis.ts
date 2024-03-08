
import { MongoClient } from 'mongodb'


const URI = process.env.MONGO_URI
const options = {}

if (!URI) throw new Error('Please add your Mongo URI to .env.local')

let client = new MongoClient(URI, options)
let clientPromise : Promise<MongoClient>;
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}
if (process.env.NODE_ENV !== 'production') {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect()
  }

  clientPromise = globalWithMongo._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise