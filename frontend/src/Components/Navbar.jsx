import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
 const navigate = useNavigate();
 const token = localStorage.getItem("token");
 if (!token) {
    navigate("/login");
 }

 const handleHistory = () => {
    navigate("/history");
 };

 const handlePredict = () => {
    navigate("/predict");
 };

 const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
 };
  
 return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold"><button onClick={()=>navigate("/predict")}>Image Captioning</button></div>
        <div>
          <button onClick={handleHistory} className="text-white mx-2">
            History
          </button>
          <button onClick={handlePredict} className="text-white mx-2">
            Predict
          </button>
          <button onClick={handleLogout} className="text-white mx-2">
            Logout
          </button>
        </div>
      </div>
    </nav>
 );
}
