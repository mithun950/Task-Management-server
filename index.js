const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rxtju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
   console.log(uri)
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
        // await client.connect();
        console.log("Database connected successfully!");

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

        app.post("/tasks", async (req, res) => {
            const task = req.body;
            task.timestamp = new Date().toLocaleString("en-US", { 
                timeZone: "Asia/Dhaka"
            }); 
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

    } finally {
        
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
