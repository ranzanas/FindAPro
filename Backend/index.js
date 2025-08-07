//Initialization
import app from './app.js';
import mongoose from 'mongoose';

const port = 3000;

const uri = "mongodb+srv://silwalranzana:test123@cluster0.yk2b5j1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


//Routes
app.get('/', (_req, res) => {
    res.send("This is the home page.");
});

//Starting the server in a port
app.listen(port, () => {
    console.log(`Server started at PORT: ${port}`);
});



async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);
