const http = require("http");
const mongoose = require("mongoose");
const connectToMongo = require('./db');
const cors = require('cors');

connectToMongo();
const express = require('express');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Available Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/project");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);     // Enable task routes
app.use("/api/projects", projectRoutes); // Enable project routes


const server = http.createServer(app);   // Create an HTTP server


// Socket.IO event handling
// io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Listening for task updates and broadcasting to others
//     socket.on("taskUpdated", (taskData) => {
//         socket.broadcast.emit("taskUpdated", taskData); // Broadcast task updates
//     });

//     // Listening for chat messages
//     socket.on("chatMessage", (messageData) => {
//         socket.broadcast.emit("chatMessage", messageData); // Broadcast chat messages
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

// Start the server
server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
