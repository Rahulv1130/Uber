import { Link } from "react-router-dom";


function Start() {
  return (
    <div className="h-screen flex justify-center">
        <div className="bg-cover bg-center h-screen pt-8 bg-red-300 flex flex-col justify-between bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] ">
            <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
             <div className="bg-white py-4 px-4 pb-7">
                <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                <Link to="/login" className="flex items-center justify-center bg-black text-white rounded-lg w-full py-3 mt-5"> Continue </Link>
             </div>
        </div>
    </div>
  );
}

export default Start;
