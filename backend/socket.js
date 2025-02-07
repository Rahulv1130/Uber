const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client Connected :- ${socket.id}`);


        socket.on("join", async (data) => {
            const { userId, userType } = data;

            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;

            if(!userId || !location.ltd || !location.lng) {
                return socket.emit("error", {message: "Invalid Location data received"});
            }

            try {
                await captainModel.findByIdAndUpdate(userId, { 
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error("Error updating captain location:", error.message);
                socket.emit("error", {message: "Error updating location"});
            }
        });


        socket.on("disconnect", () => {
            console.log(`Client disconnected :- ${socket.id}`)
        });
    });
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit(message.event, message.data);
    } else {
        console.log("Socket.io is not initialized");
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };