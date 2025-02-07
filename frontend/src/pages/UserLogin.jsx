import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from 'axios';

function UserLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

        if (response.status === 200) {
            const data = response.data;

            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className="h-screen flex justify-center">

            <div className="p-6 flex flex-col justify-between h-screen ">

                <div>
                    <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />


                    <form onSubmit={(e) => submitHandler(e)}>

                        <h3 className="text-lg font-medium mb-2">What's your email ?</h3>
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

                    <p className="text-center"> New here?
                        <Link className="text-blue-600" to="/signup"> Create an account</Link>
                    </p>

                </div>


                <div>
                    <Link to="/captain-login" className="flex justify-center items-center bg-[#10b461] text-white rounded font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base "  >Sign in As Captain</Link>
                </div>

            </div>

        </div>
    );
}

export default UserLogin;