import React from "react";
import { useNavigate } from "react-router-dom";

export default function PreLogin() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            <button onClick={() => navigate("/")}> Image Captioning </button>
          </div>
          <div>
            <button onClick={()=>navigate("/login")} className="text-white mx-2">
              Login
            </button>
            <button onClick={()=>navigate("/register")} className="text-white mx-2">
              Signup
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
