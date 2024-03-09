import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import useLoggedIn from '../hooks/useLoggedIn';

const HistoryDisplay = () => {

 useLoggedIn();
 const [history, setHistory] = useState([]);

 useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/history',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHistory(data.data); // Assuming the response structure is as you provided
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchHistory();
 }, []); // Empty dependency array means this effect runs once on component mount

 return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center pt-16">
      <h2 className="text-5xl font-bold mb-4">History</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
            <img src={item.imageUrl} alt={item.caption} className="w-full h-64 object-cover rounded mb-2" />
            <p className="text-gray-700">{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
</>
 );
};

export default HistoryDisplay;
