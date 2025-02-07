const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },

    pickup: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    pickupFirstAddress: {
        type: String,
    },

    destinationFirstAddress: {
        type: String
    },

    fare: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "cancelled", "completed", "ongoing"],
        default: "pending"
    },

    duration: {
        type: Number
    },

    distance: {
        type: Number
    },

    otp: {
        type: String,
        select: false,
        required: true
    },

    paymentID: {
        type: String
    },

    orderID: {
        type: String
    },

    signature: {
        type: String
    }
})


const rideModel = mongoose.model('Ride', rideSchema);

module.exports = rideModel;