const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters']
        }
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },

    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, 'Password must be at least 6 characters']
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        name: {
            type: String,
            required: true,
            minLength: [3, 'Name must be at least 3 characters']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'Plate must be at least 3 characters']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        type: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
    },

    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});


captainSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;