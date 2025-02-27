// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rxtju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//     try {
//         await client.connect();
//         console.log("Database connected successfully!");

//         const database = client.db("taskManagementDB");
//         const tasksCollection = database.collection("tasks");
//         const usersCollection = database.collection("users");

//         // create user
//         app.post("/users", async (req, res) => {
//             const user = req.body;
//             const query = { uid: user.uid };
//             const existingUser = await usersCollection.findOne(query);
//             if (!existingUser) {
//                 const result = await usersCollection.insertOne(user);
//                 res.json({ message: "User Registered Successfully!", result });
//             } else {
//                 res.json({ message: "User Already Exists!" });
//             }
//         });

//         // login user
//         app.get("/users/:uid", async (req, res) => {
//             const uid = req.params.uid;
//             const user = await usersCollection.findOne({ uid });
//             res.json(user);
//         });

//         app.post("/tasks", async (req, res) => {
//             const task = req.body;
//             task.timestamp = new Date().toLocaleString("en-US", {
//                 timeZone: "Asia/Dhaka"
//             });
//             const result = await tasksCollection.insertOne(task);
//             res.json(result);
//         });

//         // get all tasks
//         app.get("/tasks", async (req, res) => {
//             const tasks = await tasksCollection.find().toArray();
//             res.json(tasks);
//         });

//         // update task
//         app.put("/tasks/:id", async (req, res) => {
//             const id = req.params.id;
//             const { _id, ...updatedTask } = req.body;
//             const result = await tasksCollection.updateOne(
//                 { _id: new ObjectId(id) },
//                 { $set: updatedTask }
//             );
//             res.json(result);
//         });

//         // delete task
//         app.delete("/tasks/:id", async (req, res) => {
//             const id = req.params.id;
//             const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
//             res.json(result);
//         });

//     } finally {

//     }
// }
// run().catch(console.dir);

// app.get('/', async(req, res) => {
//     res.send(' server is running')
// })

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const app = express();
// const { ObjectId } = require("mongodb");
// require("dotenv").config();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y15rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     const usersCollection = client.db("taskManagementDB").collection("users");
//     const tasksCollection = client.db("taskManagementDB").collection("tasks");

//     // create user
//     app.post("/users", async (req, res) => {
//       const user = req.body;
//       const query = { uid: user.uid };
//       const existingUser = await usersCollection.findOne(query);
//       if (!existingUser) {
//         const result = await usersCollection.insertOne(user);
//         res.json({ message: "User Registered Successfully!", result });
//       } else {
//         res.json({ message: "User Already Exists!" });
//       }
//     });

//     // login user
//     app.get("/users/:uid", async (req, res) => {
//       const uid = req.params.uid;
//       const user = await usersCollection.findOne({ uid });
//       res.json(user);
//     });

//     // post new task
//     app.post("/tasks", async (req, res) => {
//       const task = req.body;
//       task.timestamp = new Date();
//       const result = await tasksCollection.insertOne(task);
//       res.json(result);
//     });

//     // get all task
//     app.get("/tasks", async (req, res) => {
//       const tasks = await tasksCollection.find().toArray();
//       res.json(tasks);
//     });

//     // update task
//     app.put("/tasks/:id", async (req, res) => {
//       const id = req.params.id;
//       const { _id, ...updatedTask } = req.body;
//       const result = await tasksCollection.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: updatedTask }
//       );
//       res.json(result);
//     });

//     //delete api
//     app.delete("/tasks/:id", async (req, res) => {
//       const id = req.params.id;
//       const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
//       res.json(result);
//     });

//   } finally {
//     // Ensures that the client will close when you finish/error
//     //     await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", async (req, res) => {
//   res.send(" server is running........");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });










const express = require("express");
const cors = require("cors");
const app = express();
const { ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y15rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();


const database = client.db("taskManagementDB");
        const tasksCollection = database.collection("tasks");
        const usersCollection = database.collection("users");


            // create user 
            app.post("/users", async (req, res) => {
               const user = req.body;
               const query = { uid: user.uid };
               const existingUser = await usersCollection.findOne(query);
               if (!existingUser) {
                   const result = await usersCollection.insertOne(user);
                   res.json({ message: "User Registered Successfully!", result });
               } else {
                   res.json({ message: "User Already Exists!" });
               }
           });
   
           // login user 
           app.get("/users/:uid", async (req, res) => {
               const uid = req.params.uid;
               const user = await usersCollection.findOne({ uid });
               res.json(user);
           });






                   // post new task
        app.post("/tasks", async (req, res) => {
          const task = req.body;
          task.timestamp = new Date(); 
          const result = await tasksCollection.insertOne(task);
          res.json(result);
      });

      // get all task
      app.get("/tasks", async (req, res) => {
          const tasks = await tasksCollection.find().toArray();
          res.json(tasks);
      });

      // update task
      app.put("/tasks/:id", async (req, res) => {
          const id = req.params.id;
          const { _id, ...updatedTask } = req.body;  
          const result = await tasksCollection.updateOne(
              { _id: new ObjectId(id) },
              { $set: updatedTask }
          );
          res.json(result);
      });

      //delete api
      app.delete("/tasks/:id", async (req, res) => {
          const id = req.params.id;
          const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
          res.json(result);
      });


    // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);



app.get('/', async(req, res) => {
     res.send('running........')
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
