import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from "../components/RidePopUp";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext"
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000);

  });


  receiveMessage("new-ride", (data) => {
    setRide(data);
    setRidePopUpPanel(true);
  })


  const confirmRide = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  }


  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])


  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])


  return (
    <div className="h-screen">

      <div className="flex items-center justify-between p-6 pb-3 w-screen absolute">
        <img className="h-6" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <Link to="/captain/logout" className="h-10 w-10 bg-white rounded-full flex justify-center items-center">
          <i className="text-lg font-semibold ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="pt-17">
        <LiveTracking />
      </div>

      <div className="h-2/5 p-6">
        <CaptainDetails captain={captain} />
      </div>


      <div ref={ridePopUpPanelRef} className="fixed z-10 bg-white w-full translate-y-full bottom-0 px-3">
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} ride={ride} confirmRide={confirmRide} />
      </div>


      <div ref={confirmRidePopUpPanelRef} className="fixed z-10 bg-white h-screen w-full translate-y-full bottom-0 px-3">
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} ride={ride}/>
      </div>

    </div>
  );
}

export default CaptainHome;