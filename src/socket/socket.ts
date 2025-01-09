import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (server: HttpServer): void => {
  io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room based on user ID
    socket.on("joinRoom", (userId: string) => {
      socket.join(userId);
      console.log(`User with ID ${userId} joined room ${userId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

// Emit notification to a specific user
export const sendNotification = (userId: string, message: NotificationPayload): void => {
  if (io) {
    io.to(userId).emit("notification", message);
  }
};

// Notification payload type
export interface NotificationPayload {
  title: string;
  body: string;
  timestamp: string; 
}
