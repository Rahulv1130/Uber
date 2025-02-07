import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext, useEffect } from "react";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {

    const location = useLocation();
    const ride = location.state?.ride
    const navigate = useNavigate();

    const { receiveMessage } = useContext(SocketContext);


    receiveMessage("ride-ended", async (ride) => {
        navigate("/home");
        window.location.reload();
    })


    return (
        <div className="h-screen z-20">

            <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white rounded-full flex justify-center items-center">
                <i className="text-lg font-semibold ri-home-5-line"></i>
            </Link>

            <div >
                < LiveTracking />
            </div>

            <div className="p-4">

                <div className="flex items-center justify-between">
                    <img className="h-17 -mt-6" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />
                    <div className="text-right">
                        <h2 className="font-medium text-lg">{ride.captain.fullname.firstname} {ride.captain.fullname.lastname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-500">{ride.captain.vehicle.name}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2 p-5">

                    <div className="w-full ">

                        <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300 -mt-3">
                            <i className="text-lg ri-square-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">{ride.destinationFirstAddress}</h3>
                                <p className="text-sm text-gray-600 -mt-1">{ride?.destination.substring(ride?.destinationFirstAddress.length + 2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-3 ">
                            <i className="text-lg ri-bank-card-2-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹{ride.fare}</h3>
                                <p className="text-sm text-gray-600 -mt-1">Cash</p>
                            </div>
                        </div>
                    </div>

                </div>

                <button className="bg-green-600 text-white rounded-lg w-full p-2 font-semibold -mt-4" >Make a Payment</button>

            </div>
        </div>
    )
}

export default Riding;