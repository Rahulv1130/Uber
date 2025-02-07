

const VehiclePanel = ({ setVehiclePanelOpen, setConfirmRidePanel, fare, setVehicleType }) => {

    

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-5 p-3">Choose a Vehicle</h3>

            <h5 onClick={() => { setVehiclePanelOpen(false); setConfirmRidePanel(false); }} className="absolute top-0 w-[93%] text-center p-1">
                <i className="text-gray-300 text-3xl ri-arrow-down-wide-line"></i>
            </h5>

            <div onClick={() => { setConfirmRidePanel(true); setVehiclePanelOpen(false); setVehicleType("car"); }} className="flex items-center pl-1 border border-gray-100 active:border-2 active:border-black justify-between py-3 pr-2 rounded-xl mb-2 cursor-pointer">
                <img className="h-13 mr-1 " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" />
                <div className="w-1/2">
                    <span className="font-bold text-lg "> UberGo  </span>
                    <span><i className="ri-user-3-fill"></i> 4 </span>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="text-gray-600 text-xs">Affordable, compact rides</p>
                </div>
                <h2 className="font-semibold text-lg">₹{fare.car}</h2>
            </div>


            <div onClick={() => { setConfirmRidePanel(true); setVehiclePanelOpen(false); setVehicleType("auto"); }} className="flex items-center pl-1 border border-gray-100 active:border-2 active:border-black justify-between py-3 pr-2 rounded-xl mb-2 cursor-pointer">
                <img className="h-13 mr-2 ml-3 " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" />
                <div className="w-1/2">
                    <span className="font-bold text-lg "> UberAuto  </span>
                    <span><i className="ri-user-3-fill"></i> 3 </span>
                    <h5 className="font-medium text-sm">5 mins away</h5>
                    <p className="text-gray-600 text-xs">Affordable, auto rides</p>
                </div>
                <h2 className="font-semibold text-lg">₹{fare.auto}</h2>
            </div>


            <div onClick={() => { setConfirmRidePanel(true); setVehiclePanelOpen(false); setVehicleType("moto"); }} className="flex items-center pl-1 border border-gray-100 active:border-2 active:border-black justify-between py-3 pr-2 rounded-xl mb-2 cursor-pointer">
                <img className="h-13 mr-2 ml-3 " src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" />
                <div className="w-1/2">
                    <span className="font-bold text-lg "> Moto  </span>
                    <span><i className="ri-user-3-fill"></i> 1 </span>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="text-gray-600 text-xs">Affordable, motorcycle rides</p>
                </div>
                <h2 className="font-semibold text-lg">₹{fare.moto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel;