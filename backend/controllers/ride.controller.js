const { validationResult } = require('express-validator');
const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType, pickupFirstAddress, destinationFirstAddress } = req.body;

    try {

        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType, pickupFirstAddress, destinationFirstAddress });
        res.status(201).json(ride);

        const { ltd, lng } = await mapService.getAddressCoordinates(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(ltd, lng, 5, vehicleType);

        ride.otp = "";
        const rideWithUser = await ride.populate("user");

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        });



    } catch (err) {
        return res.status(400).json({ message: err.message })
    }

}



module.exports.getFare = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.json(fare);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}


module.exports.confirmRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {

        const ride = await rideService.confirmRide({ rideId, captainId: req.captain._id });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        });

        return res.status(200).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



module.exports.startRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captainId: req.captain._id });

        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-started",
            data: ride
        });

        return res.status(200).json(ride);

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}


module.exports.endRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {

        const ride = await rideService.endRide({ rideId, captainId: req.captain._id });

        sendMessageToSocketId(ride?.user.socketId, {
            event: "ride-ended",
            data: ride
        })

        res.status(200).json(ride);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}