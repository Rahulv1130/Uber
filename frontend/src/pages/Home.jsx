import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";


function Home() {

    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const vehiclePanelRef = useRef(null);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);
    const [findingDriverPanel, setFindingDriverPanel] = useState(false);
    const findingDriverRef = useRef(null);
    const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
    const waitingForDriverRef = useRef(null);
    const destinationInputRef = useRef(null);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState("");
    const [pickupFirstAddress, setPickupFirstAddress] = useState("");
    const [destinationFirstAddress, setDestinationFirstAddress] = useState("");

    const [ride, setRide] = useState(null);
    const [otp, setOtp] = useState(null);

    const { sendMessage, receiveMessage } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    const navigate = useNavigate();


    useEffect(() => {
        sendMessage("join", { userType: "user", userId: user._id });
    });


    receiveMessage("ride-confirmed", async (ride) => {

        setFindingDriverPanel(false);
        setWaitingForDriverPanel(true);
        setRide(ride);
    });


    receiveMessage("ride-started", async (ride) => {
        setWaitingForDriverPanel(false);
        navigate("/riding", { state: { ride } });
    })


    function submitHandler(e) {
        e.preventDefault();


    }

    const handlePickupChange = async (e) => {
        setPickup(e.target.value);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setPickupSuggestions(response.data);

        } catch (err) {
            throw err;
        }

    }


    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setDestinationSuggestions(response.data);

        } catch (err) {
            throw err;
        }


    }



    async function getFare() {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setFare(response.data);
    }


    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType,
            pickupFirstAddress,
            destinationFirstAddress
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setOtp(response.data.otp);
    }



    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    useGSAP(function () {
        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen])


    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])


    useGSAP(function () {
        if (findingDriverPanel) {
            gsap.to(findingDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(findingDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [findingDriverPanel])


    useGSAP(function () {
        if (waitingForDriverPanel) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriverPanel])



    return (


        <div className="h-screen relative ">
            <img className=" w-16 absolute top-5 left-5 bg-white" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />


            <div className=" h-screen w-screen pt-15">
                <LiveTracking />
            </div>


            <div className="absolute h-screen top-0 w-full flex flex-col justify-end">

                <div>
                    <Link to={"/user/logout"} className="absolute h-10 w-10 flex justify-center items-center right-2 top-3 border-2 rounded-full bg-white"><i className="text-lg font-semibold ri-logout-box-r-line"></i></Link>
                </div>

                <div className="h-[30%] bg-white p-6 relative">

                    <h5 onClick={() => { setPanelOpen(false) }}
                        className="absolute top-6 right-6 text-2xl opacity-0"
                        ref={panelCloseRef}>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                    <h4 className="text-2xl font-semibold">Find a trip</h4>

                    <div className="line bg-black w-1 h-17 absolute top-[48%] left-10 rounded-full" ></div>

                    <form onSubmit={(e) => { submitHandler(e) }} >
                        <input onChange={async (e) => { await handlePickupChange(e) }}
                            onClick={() => { setPanelOpen(true); setActiveField("pickup") }}
                            className="bg-[#eee] mt-5 px-12 py-3 w-full rounded-lg"
                            type="text"
                            value={pickup}
                            placeholder="Add a pick-up location"
                        />
                        <input onChange={async (e) => { await handleDestinationChange(e) }}
                            onClick={() => { setPanelOpen(true); setActiveField("destination") }}
                            className="bg-[#eee] mt-3 px-12 py-3 w-full rounded-lg "
                            type="text"
                            value={destination}
                            placeholder="Enter your destination"
                            ref={destinationInputRef}
                        />
                    </form>

                </div>



                <div className="bg-white h-0 overflow-hidden" ref={panelRef} >
                    {panelOpen ? <LocationSearchPanel
                        setPanelOpen={setPanelOpen}
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        setActiveField={setActiveField}
                        destinationInputRef={destinationInputRef}
                        getFare={getFare}
                        setPickupFirstAddress={setPickupFirstAddress}
                        setDestinationFirstAddress={setDestinationFirstAddress}
                    /> : ""}
                </div>


                <div ref={vehiclePanelRef} className="fixed z-10 bg-white pr-3 py-8 w-full translate-y-full overflow-hidden">
                    <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel} fare={fare} setVehicleType={setVehicleType} />
                </div>


                <div ref={confirmRidePanelRef} className="fixed z-10 pr-3 pb-16 bg-white w-full translate-y-full overflow-hidden">
                    <ConfirmRide
                        setVehiclePanelOpen={setVehiclePanelOpen}
                        setFindingDriverPanel={setFindingDriverPanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        createRide={createRide}
                        fare={fare}
                        vehicleType={vehicleType}
                        pickupFirstAddress={pickupFirstAddress}
                        destinationFirstAddress={destinationFirstAddress}
                        pickup={pickup}
                        destination={destination}
                    />
                </div>


                <div ref={findingDriverRef} className="fixed z-10 pr-3 py-8 bg-white w-full translate-y-full overflow-hidden">
                    <LookingForDriver
                        setFindingDriverPanel={setFindingDriverPanel}
                        pickupFirstAddress={pickupFirstAddress}
                        destinationFirstAddress={destinationFirstAddress}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                    />
                </div>


                <div ref={waitingForDriverRef} className="fixed z-10 bg-white w-full translate-y-full px-3 overflow-hidden">
                    <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} ride={ride} otp={otp} />
                </div>


            </div>

        </div>
    )
}

export default Home;



