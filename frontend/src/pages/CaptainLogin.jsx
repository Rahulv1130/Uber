import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';

function CaptainLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const captainData = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);

        if (response.status === 200) {
            const data = response.data;

            localStorage.setItem('token', data.token);
            setCaptain(data.captain);
            navigate('/captain-home');

        }

        setEmail('');
        setPassword('');
    }

    return (

        <div className="h-screen flex justify-center">

            <div className="p-6 flex flex-col justify-between h-screen">

                <div>
                    <img className="w-20 mb-5" src="https://www.svgrepo.com/show/505031/uber-driver.svg" />


                    <form onSubmit={(e) => submitHandler(e)}>

                        <h3 className="text-lg font-medium mb-2">What's our Captain's email ?</h3>
                        <input
                            type='email'
                            placeholder="abc@example.com"
                            value={email}
                            required
                            className="bg-[#eeeeee] rounded mb-7 px-4 py-2 w-full text-lg placeholder:text-base "
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            required
                            className="bg-[#eeeeee] rounded mb-7 px-4 py-2 w-full text-lg placeholder:text-base "
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="bg-[#111] text-white rounded font-semibold mb-3 px-4 py-2 w-full text-lg placeholder:text-base " >Login</button>

                    </form>

                    <p className="text-center"> Want to start earning?
                        <Link className="text-blue-600" to="/captain-signup"> Register as a Captain </Link>
                    </p>

                </div>


                <div>
                    <Link to="/login" className="flex justify-center items-center bg-[#d5622d] text-white rounded font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base "  >Sign in As User</Link>
                </div>

            </div>

        </div>
    );
}

export default CaptainLogin;