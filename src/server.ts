import express , {Express} from 'express'
const Port = 5000
const app :Express = express()
import mongoose from 'mongoose'


app.use(express.json());


const uri = 
"mongodb+srv://fatma:Mokranifatma22@cluster0.m096geo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";





async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch {
    console.log(Error)
  }
}
run().catch(console.dir);








app.listen( Port , () => {
    console.log(`serveur running on port ${Port}`)


}) 
