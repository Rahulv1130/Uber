import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = ({ setConfirmRidePopUpPanel, ride }) => {

    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        const n = Number(otp);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: ride._id,
                    otp: otp
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
    
    
            if (response.status === 200) {
                navigate("/captain-riding", { state: { ride } });
                window.location.reload();
            }
    
        } catch(err) {
            alert("Invalid Request");
        }
       
    }

    return (
        <div>
            <h5 onClick={() => { setConfirmRidePopUpPanel(false) }} className=" w-full text-center p-1">
                <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold pl-3 mb-5">Ride Details !</h3>

            <div className="flex items-center justify-between bg-yellow-400 p-3 rounded-lg">

                <div className="flex items-center gap-3">
                    <img className="rounded-full h-12 w-12 object-cover" src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" />
                    <h4 className="text-lg font-medium">{ride?.user.fullname.firstname} {ride?.user.fullname.lastname}</h4>
                </div>

                <h5 className="text-lg font-semibold">2.2 km</h5>

            </div>

            <div className="flex flex-col justify-center items-center gap-2 p-5">

                <div className="w-full">
                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride?.pickupFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{ride?.pickup.substring(ride?.pickupFirstAddress.length + 2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{ride?.destinationFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{ride?.destination.substring(ride?.destinationFirstAddress.length + 2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 ">
                        <i className="text-lg ri-bank-card-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Cash</p>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-1">

                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="number" placeholder="Enter OTP" className="rounded-lg px-6 py-3 text-lg font-mono w-full bg-[#eee]" />
                        <button className="text-lg bg-green-600 mt-4 w-full font-semibold text-white p-3 rounded-lg">Confirm</button>
                    </form>


                    <button onClick={() => { setConfirmRidePopUpPanel(false) }} className="text-lg bg-red-700 text-white mt-2 w-full font-semibold p-3 rounded-lg">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp;