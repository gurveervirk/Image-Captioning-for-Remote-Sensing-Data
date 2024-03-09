import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreLogin from './PreLogin';

const Signup = () => {

 const [name, setName] = useState('');
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();
 const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}, Username: ${username}`);
    if(!name || !email || !password || !username){
        alert("Please fill all the fields");
        return;
    }
    const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ fullName:name, username, email, password }),
    });

    console.log(response);
    if (!response.ok) {
        navigate('/register');
        throw new Error('Registration failed');
    }
    navigate('/login');
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
 };

 return (
   <>
   <PreLogin/>
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
 <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
 <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
        Full Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        autoComplete="new-password"
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </div>
 </form>
</div>

   </>
  
 );
};

export default Signup;
