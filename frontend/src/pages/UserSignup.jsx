import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";


function UserSignup() {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if (response.status === 201) {
            const data = response.data;

            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    return (

        <div className="h-screen flex justify-center">

            <div className="p-6 flex flex-col justify-between h-screen">

                <div>
                    <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />


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

                        <h3 className="text-base font-medium mb-2">What's your email ?</h3>
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

                        <button className="bg-[#111] text-white rounded font-semibold mb-3 px-4 py-2 w-full text-lg placeholder:text-base cursor-pointer" >Sign up</button>

                    </form>

                    <p className="text-center"> Already have an account?
                        <Link className="text-blue-600" to="/login"> Sign in</Link>
                    </p>

                </div>


                <div>
                    <Link to="/captain-signup" className="flex justify-center items-center bg-[#10b461] text-white rounded font-semibold mb-7 px-4 py-2 w-full text-lg placeholder:text-base "  >Sign Up As Captain</Link>
                </div>

            </div>

        </div>
    ); 1
}

export default UserSignup;