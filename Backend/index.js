// const http = require("http");
// const socketIo = require("socket.io");
const mongoose = require("mongoose");
const connectToMongo = require('./db');
const cors = require('cors'); // Import CORS


// const server = http.createServer(app);
// const io = socketIo(server);

connectToMongo();
const express = require('express');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors()); // Use CORS middleware

app.use(express.json()); // Middleware to parse JSON bodies

// Available Routes
const authRoutes = require("./routes/auth");
// const taskRoutes = require("./routes/task");
// const projectRoutes = require("./routes/project");

app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/projects", projectRoutes);


// WebSocket Setup (Socket.IO)
// io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Listening for task updates and broadcasting to others
//     socket.on("taskUpdated", (taskData) => {
//         socket.broadcast.emit("taskUpdated", taskData);
//     });

//     // Listening for chat messages
//     socket.on("chatMessage", (messageData) => {
//         socket.broadcast.emit("chatMessage", messageData);
//     });

//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
// });

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
