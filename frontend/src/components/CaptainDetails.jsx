


const CaptainDetails = ({captain}) => {
    return (
        <div>
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <img className="rounded-full h-15 w-15 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" />
                    <h4 className="text-lg font-medium">{captain.fullname.firstname} {captain.fullname.lastname}</h4>
                </div>

                <div>
                    <h4 className="text-xl font-semibold">₹295.20</h4>
                    <p className="text-sm text-gray-500 rounded p-0.5 text-center">Earned</p>
                </div>

            </div>


            <div className="flex justify-center gap-6 p-3 bg-gray-100 rounded-xl mt-8">

                <div className="text-center">
                    <i className="text-3xl font-extralight ri-time-line"></i>
                    <h5 className="text-lg mt-2 font-medium">10.2</h5>
                    <p className="text-sm text-gray-400">Hours Online</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl font-extralight ri-speed-up-line"></i>
                    <h5 className="text-lg mt-2 font-medium">36.5 </h5>
                    <p className="text-sm text-gray-400">km travelled</p>
                </div>

                <div className="text-center">
                    <i className="text-3xl font-extralight ri-booklet-line"></i>
                    <h5 className="text-lg mt-2 font-medium">15</h5>
                    <p className="text-sm text-gray-400">Rides done</p>
                </div>

            </div>
        </div>
    )
}


export default CaptainDetails;