import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PreLogin from './PreLogin';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
       e.preventDefault();
       const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    // console.log(response);
    if (!response.ok) {
        alert("Invalid username or password");
        return;
        // throw new Error('Login failed');
    }
    const data = (await response.json()).data;
    if(data.accessToken === undefined){
        alert("Invalid username or password");
        return;
    }

    localStorage.setItem('token', data.accessToken);

    // Handle successful login (e.g., redirect to another page)
    navigate('/predict');

    };
   
    return (
        <div className="">
          <PreLogin/>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
 <h1 className="text-4xl font-bold mb-8">Login</h1>
 <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Sign in
      </button>
    </div>
 </form>
</div>

        </div>
    );
   };