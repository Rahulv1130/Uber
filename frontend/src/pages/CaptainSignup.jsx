import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainSignup() {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            email,
            password,
            fullname: {
                firstname,
                lastname
            },
            vehicle: {
                name: vehicleName,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                type: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if (response.status === 201) {
            const data = response.data;
            localStorage.setItem('token', data.token);
            setCaptain(data.captain);
            navigate('/captain-home');
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleName('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    return (

        <div className="h-screen flex justify-center">

            <div className="p-6 flex flex-col justify-between h-screen">

                <div>
                    <img className="w-20 mb-2" src="https://www.svgrepo.com/show/505031/uber-driver.svg" />


                    <form onSubmit={(e) => submitHandler(e)}>

                        <h3 className="text-base font-medium mb-2">What's your name ?</h3>
                        <div className="flex gap-3 mb-7">
                            <input
                                type='text'
                                placeholder="First name"
                                value={firstname}
                                required
                                className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-base placeholder:text-sm "
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                type='text'
                                placeholder="Last name"
                                value={lastname}
                                required
                                className="bg-[#eeeeee] rounded w-1/2 px-4 py-2 text-base placeholder:text-sm "
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <h3 className="text-base font-medium mb-2">What's our Captain's email ?</h3>
                        <input
                            type='email'
                            placeholder="abc@example.com"
                            value={email}
                            required
                            className="bg-[#eeeeee] rounded mb-7 px-4 py-2 w-full text-base placeholder:text-sm "
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <h3 className="text-base font-medium mb-2">Enter Password</h3>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            required
                            className="bg-[#eeeeee] rounded mb-7 px-4 py-2 w-full text-base placeholder:text-sm "
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
                        <div className="grid grid-cols-2 gap-4 mb-7">
                            <input
                                type='text'
                                placeholder="Vehicle Name"
                                value={vehicleName}
                                required
                                className="bg-[#eeeeee] rounded px-2 py-2 text-base placeholder:text-sm "
                                onChange={(e) => setVehicleName(e.target.value)}
                            />

                            <input
                                type='text'
                                placeholder="Vehicle Plate"
                                value={vehiclePlate}
                                required
                                className="bg-[#eeeeee] rounded px-2 py-2 text-base placeholder:text-sm "
                                onChange={(e) => setVehiclePlate(e.target.value)}
                            />

                            <input
                                type='number'
                                placeholder="Vehicle Capacity"
                                value={vehicleCapacity}
                                required
                                className="bg-[#eeeeee] rounded px-2 py-2 text-base placeholder:text-sm "
                                onChange={(e) => setVehicleCapacity(e.target.value)}
                            />

                            <select value={vehicleType}
                                className="bg-[#eeeeee] rounded px-2 py-2 text-sm placeholder:text-sm "
                                onChange={(e) => { setVehicleType(e.target.value) }} required
                            >
                                <option value="" disabled > Vehicle Type </option>
                                <option value="car"> Car </option>
                                <option value="auto"> Auto </option>
                                <option value="motorcycle"> Motorcycle </option>
                            </select>
                        </div>


                        <button className="bg-[#111] text-white rounded font-semibold mb-1 px-4 py-2 w-full text-lg placeholder:text-base " >Sign up</button>

                    </form>

                    <p className="text-center"> Already a Captain?
                        <Link className="text-blue-600" to="/captain-login"> Login </Link>
                    </p>

                </div>


                <div>
                    <Link to="/signup" className="flex justify-center items-center bg-[#d5622d] text-white rounded font-semibold mb-4 px-4 py-2 w-full text-lg placeholder:text-base "  >Sign Up As User</Link>
                </div>

            </div>

        </div>
    );
}

export default CaptainSignup;