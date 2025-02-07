const captainModel = require('../models/captain.model');

module.exports.createCaptain = async function ({ 
    firstname, lastname, email, password, name, plate, capacity, type }) {
    
    if(!firstname || !email || !password || !name || !plate || !capacity || !type) {
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            name,
            plate,
            capacity,
            type
        }
    });

    return captain;
}