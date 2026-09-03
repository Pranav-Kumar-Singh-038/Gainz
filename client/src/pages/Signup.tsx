import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {api} from '../lib/api.ts';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');


    function navigateToLogin() {
        try {
            navigate('/login')
        }
        catch (err) {
            console.error(err);
        }
    }

    async function submitUserDetails() {
        try {
            const response = await api('/api/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });
            if (!response.ok) {
                const errorData = await response.json();

                // console.log("Status:", response.status);
                // console.log("Error response:", errorData);

                throw new Error(errorData.message || "Signup failed");
            }
            alert("Signup Successful!");
            navigate("/login");
        }
        catch (err: unknown) {
            alert(` ${err}`);
        }
    }
    return (
        <>
            <h1>Signup</h1>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
            <input placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
            <button onClick={submitUserDetails}>Submit</button>
            <p>Already a User? Click to Login</p>
            <button onClick={navigateToLogin}>Login</button>

        </>
    )
}

export default Signup