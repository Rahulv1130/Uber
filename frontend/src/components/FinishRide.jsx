import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const FinishRide = ({ setFinishRidePanel, ride }) => {

    const navigate = useNavigate();

    const endRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: ride._id,
        } , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        if(response.status === 200) {
            navigate("/captain-home");
        }
    }

    return (
        <div>
            <h5 onClick={() => { setFinishRidePanel(false) }} className=" w-full text-center p-1">
                <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold pl-3 mb-5">Finish Ride !</h3>

            <div className="flex items-center justify-between border-2 border-yellow-400 p-4 rounded-lg">

                <div className="flex items-center gap-3">
                    <img className="rounded-full h-12 w-12 object-cover" src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" />
                    <h4 className="text-lg font-medium">{ride.user.fullname.firstname} {ride.user.fullname.lastname}</h4>
                </div>

                <h5 className="text-lg font-semibold">2.2 km</h5>

            </div>

            <div className="flex flex-col justify-center items-center gap-2 p-5">

                <div className="w-full mt-5">
                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride.pickupFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{ride?.pickup.substring(ride?.pickupFirstAddress.length + 2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride.destinationFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{ride?.pickup.substring(ride?.pickupFirstAddress.length + 2)}</p>
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

                <div className="w-full mt-6">
                    <button onClick={endRide} className="flex bg-green-600 text-lg justify-center mt-10 w-full font-semibold text-white p-3 rounded-lg">Finish Ride</button>
                </div>

                <div className="mt-10 w-screen text-center">
                    <p className="text-xs text-red-500">Click on the Finish Ride button if you have received the payment !</p>
                </div>
            </div>
        </div>
    )
}


export default FinishRide;