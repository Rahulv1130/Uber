const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.route");
const captainRoutes = require("./routes/captain.route");
const mapRoutes = require("./routes/maps.route");
const rideRoutes = require("./routes/ride.route");

connectToDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/" , (req,res) => {
    res.send("Hello My name is Rahul");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);





module.exports = app;