import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {api} from '../lib/api.ts';

function Login({ setLoggedIn }: { setLoggedIn: (value: boolean) => void })
{
    const navigate = useNavigate();
    const [email,setEmail]=useState<String>('');
    const [password,setPassword]=useState<String>('');

    function navigateToSignup()
    {
        try
        {
            navigate('/signup')
        }
        catch(err)
        {
            console.error(err);
        }
    }
    async function submitUserDetails()
    {
        try
        {
            const response = await api('/api/login',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:email, password:password})
            })
            if(!response.ok)
            {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login Failed");
            }
            const responseData = await response.json();
            const userData = responseData.data;
            localStorage.setItem("userId",userData.id);
            setLoggedIn(true);
            alert("Login Successful");
            navigate("/");
        }
        catch(err)
        {
            alert(`${err}`);
        }
    }

    return (
        <>
        <h1>Login</h1>
        <input placeholder="Email" onChange={e=> setEmail(e.target.value)}></input>
        <input placeholder="Password" onChange={e=> setPassword(e.target.value)}></input>
        <button onClick={submitUserDetails}> Submit</button>
        <p>First Time User? Click to Signup</p>
        <button onClick={navigateToSignup}>SignUp</button>
        </>
    )
}

export default Login;