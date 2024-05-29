// MongoDB connection setup
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://wroxen240:Yv16vwHePW31hCRC@cluster0.zdudrwn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }

    const db = client.db('myDatabase');
    const collection = db.collection('stars');
    const count = await collection.countDocuments();

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
