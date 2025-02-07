

const LookingForDriver = ({ setFindingDriverPanel, pickupFirstAddress, destinationFirstAddress,
    pickup, destination, vehicleType, fare }) => {

    const image = {
        auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
        car: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
        moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
    }

    return (

        <div>

            <h5 onClick={() => { setFindingDriverPanel(false) }} className=" w-full text-center p-1">
                <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold pl-3">Looking for a Driver</h3>

            <div className="flex flex-col justify-center items-center gap-2 p-5">
                <img className="h-25" src={image[vehicleType]} />

                <div className="w-full mt-5">
                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{pickupFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{pickup.substring(pickupFirstAddress.length + 2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 border-b-2 border-gray-300">
                        <i className="text-lg ri-square-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{destinationFirstAddress}</h3>
                            <p className="text-sm text-gray-600 -mt-1">{destination.substring(destinationFirstAddress.length + 2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 ">
                        <i className="text-lg ri-bank-card-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">₹{fare[vehicleType]}</h3>
                            <p className="text-sm text-gray-600 -mt-1">Cash</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LookingForDriver;