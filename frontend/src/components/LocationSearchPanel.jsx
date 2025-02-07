

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen, suggestions, activeField, setPickup, 
    setDestination, destinationInputRef, setActiveField, getFare, setPickupFirstAddress, setDestinationFirstAddress }) => {


    return (
        <div>
            {suggestions.map((address, index) => (
                <div onClick={ async () => { 
                    if(activeField === "pickup") {
                        setPickup(address.description);
                        setPickupFirstAddress(address.terms[0].value);
                        destinationInputRef.current.focus();
                        setActiveField("destination");
                    } else {
                        setDestination(address.description);
                        setDestinationFirstAddress(address.terms[0].value);
                        await getFare();
                        setVehiclePanelOpen(true); 
                        setPanelOpen(false) 
                    }
                    }} 


                    key={index} 
                    className="flex items-center gap-4 my-2 border-2 border-gray-50 active:border-black p-3 rounded-xl cursor-pointer">

                    <div className="flex justify-center items-center rounded-full">
                        <i className="ri-map-pin-fill text-lg"></i>
                    </div>

                    <h4 className="leading-tight">{address.description}</h4>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
