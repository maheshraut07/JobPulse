import mongoose from "mongoose";
// import {MongoClient,ServerApiVersion} from 'mongodb'

// const client = new MongoClient(process.env.MONGO_URI,{
//     serverApi:{
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// })

// async function connnectDB() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);

const connnectDB = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected successfully !!')
    }catch(error){
        console.log(error)
    }
}

export default connnectDB