import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    const location = useLocation();
    const ride = location.state?.ride;

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])


    return (
        <div className="h-screen ">

            <div className="fixed flex items-center justify-between p-6 w-screen">
                <img className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                <Link to="/captain/logout" className="h-10 w-10 bg-white rounded-full flex justify-center items-center">
                    <i className="text-lg font-semibold ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className="h-4/5">
            < LiveTracking />
            </div>

            <div onClick={ () => { setFinishRidePanel(true) }} className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative">

                <h5 className="w-[88%] text-center absolute bottom-27">
                    <i className="text-black text-3xl ri-arrow-up-wide-line"></i>
                </h5>

                <h4 className="text-xl font-semibold mt-4" >4 km away</h4>
                <button className="bg-green-600 font-semibold text-white p-3 px-8 mt-4 rounded-lg" >Complete Ride</button>
            </div>


            <div ref={finishRidePanelRef} className="fixed z-10 bg-white w-full translate-y-full bottom-0 px-3">
                <FinishRide setFinishRidePanel={setFinishRidePanel} ride={ride}/>
            </div>

        </div>
    )
}

export default CaptainRiding;