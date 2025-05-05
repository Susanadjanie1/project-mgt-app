const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://susanadjanie1:pPNOoxtdNO67TZDf@planny-pro.aozupfo.mongodb.net/projectdb?retryWrites=true&w=majority";

async function addUser() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('projectdb');
    const usersCollection = db.collection('users');

    // Insert a test user
    const result = await usersCollection.insertOne({
      name: "Admin",
      email: "admin@example.com",
      password: "adminpass",  // Hash passwords before storing them
      role: "admin"
    });

    console.log(`User added with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

addUser().catch(console.error);
