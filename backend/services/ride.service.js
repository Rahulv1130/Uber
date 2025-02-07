const rideModel = require("../models/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./maps.service");
const crypto = require("crypto");



async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const distance = distanceTime.distance.value / 1000;
    const duration = distanceTime.duration.value / 60;

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 12,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: (baseFare.auto + (distance * perKmRate.auto) + (duration * perMinuteRate.auto)).toFixed(2),
        car: (baseFare.car + (distance * perKmRate.car) + (duration * perMinuteRate.car)).toFixed(2),
        moto: (baseFare.moto + (distance * perKmRate.moto) + (duration * perMinuteRate.moto)).toFixed(2)
    };

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}



module.exports.createRide = async ({ user, pickup, destination, vehicleType, pickupFirstAddress, destinationFirstAddress }) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All Fields are required");
    }

    const fare = await getFare(pickup, destination);
    const otp = getOtp(6);

    const ride = rideModel.create({
        user,
        pickup,
        otp,
        destination,
        fare: fare[vehicleType],
        pickupFirstAddress,
        destinationFirstAddress
    })

    return ride;

}


module.exports.confirmRide = async ({ rideId, captainId }) => {
    if (!rideId) {
        throw new Error("Ride Id is Empty");
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, {
        status: "accepted",
        captain: captainId
    });

    const ride = await rideModel.findOne({ _id: rideId }).populate("captain").populate("user");

    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
}


module.exports.startRide = async ({ rideId, otp }) => {
    const ride = await rideModel.findById(rideId).populate("user").populate("captain").select("+otp");

    if (!ride) {
        throw new Error("Ride not Found");
    }

    if (ride.status !== "accepted") {
        throw new Error("Ride not accepted");
    }



    if (otp !== ride.otp) {
        throw new Error("Invalid OTP");
    }

    await rideModel.findByIdAndUpdate(rideId, {
        status: "ongoing"
    });

    return ride;
}



module.exports.endRide = async ({ rideId, captainId }) => {

    if (!rideId) {
        throw new Error("Ride id is required");
    }

    const ride = await rideModel.findOne({ _id: rideId, captain: captainId });

    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== "ongoing") {
        throw new Error("Ride not ongoing");
    }

    const response = await rideModel.findByIdAndUpdate(rideId, {
        status: "completed"
    }).populate("captain").populate("user")

    if (!response) {
        throw new Error("Error occurred while updating ride status to end ride");
    }

    return response;
}