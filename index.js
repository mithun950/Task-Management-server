const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rxtju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        console.log("Database connected successfully!");

        const database = client.db("taskManagementDB");
        const tasksCollection = database.collection("tasks");
        const usersCollection = database.collection("users");

        // Socket.io connection
        io.on("connection", (socket) => {
            console.log("A user connected");

            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });

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

        // Add a new task
        app.post("/tasks", async (req, res) => {
            const task = req.body;
            task.timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
            const result = await tasksCollection.insertOne(task);
            io.emit("taskAdded", task);
            res.json(result);
        });

        // Get all tasks
        app.get("/tasks", async (req, res) => {
            const tasks = await tasksCollection.find().toArray();
            res.json(tasks);
        });

        // Update task
        app.put("/tasks/:id", async (req, res) => {
            const id = req.params.id;
            const { _id, ...updatedTask } = req.body;
            const result = await tasksCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedTask }
            );
            io.emit("taskUpdated", { id, updatedTask });
            res.json(result);
        });

        // Delete task
        app.delete("/tasks/:id", async (req, res) => {
            const id = req.params.id;
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
            io.emit("taskDeleted", id);
            res.json(result);
        });

    } finally {
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
