import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

// Store userId to socket.id mapping
const users = {};

// Utility function to get socket id by userId
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

const io = new Server(server, {
    cors: {
        origin: "https://cokkie-chat.onrender.com",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("New Client connected:", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("User ID:", userId);

    if (userId) {
        users[userId] = socket.id;
        console.log("Online Users:", users);
    }

    io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        if (userId) {
            delete users[userId];
        }
        io.emit("getOnlineUsers", Object.keys(users));
    });
});

export { app, io, server };
