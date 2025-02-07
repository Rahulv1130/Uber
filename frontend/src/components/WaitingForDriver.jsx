
const WaitingForDriver = ({ setWaitingForDriverPanel, ride, otp }) => {
    return (
        <div>
            <div>

                <h5 onClick={()=>{setWaitingForDriverPanel(false)}} className=" w-full text-center p-1">
                    <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
                </h5>

                <div className="flex items-center justify-between">
                    <img className="h-17 -mt-6" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" />
                    <div className="text-right">
                        <h2 className="font-medium text-lg">{ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                        <p className="text-sm text-gray-500">{ride?.captain.vehicle.name}</p>
                    </div>
                </div>

                <div className="font-bold text-xl mt-8 text-center">
                    Otp :- {otp}
                </div>

                <div className="flex flex-col justify-center items-center gap-2 p-5 mb-5">

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

                </div>

            </div>
        </div>
    )
}

export default WaitingForDriver;