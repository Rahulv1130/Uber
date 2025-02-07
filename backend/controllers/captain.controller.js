const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password, vehicle } = req.body;

    const isCaptainAlreadyRegistered = await captainModel.findOne({ email });

    if(isCaptainAlreadyRegistered) {
        return res.status(400).json({ message: 'Captain already registered' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        email, 
        firstname: fullname.firstname, 
        lastname: fullname.lastname,
        password: hashedPassword, 
        name: vehicle.name,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        type: vehicle.type
    });

    const token = await captain.generateAuthToken();
    res.cookie('token', token);

    res.status(201).json({captain, token});
    
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if(!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await captain.generateAuthToken();
    res.cookie('token', token);
    
    return res.status(200).json({captain, token});
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    

    res.status(200).json({ message: 'Captain logged out Successfully' });
}