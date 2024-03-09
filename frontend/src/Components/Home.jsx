import React from 'react';
import { useNavigate } from 'react-router-dom';
import PreLogin from './PreLogin';

export default function Home() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignup = () => {
        navigate('/register');
    }
    return (
        <>
            <PreLogin/>

    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Image Captioning</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl font-bold mb-2">About Us</h2>
          <p>Image Captioning is a service that predicts captions for images. Our AI-powered model analyzes images and generates relevant captions.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p>Upload an image, and our AI will analyze it and provide a caption. You can also view your history and predictions.</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-2xl font-bold mb-2">Get Started</h2>
          <p>Sign up or log in to start using Image Captioning. No account needed for <button style={{color:"blue"}}><a href="http://localhost:8501" target='_blank'>Quick Predictions</a></button>.</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <img src="src\assets\clip-rsicd-header-image.png" alt="Image Captioning" className="w-full md:w-1/2 lg:w-1/3 mx-auto" />
      </div>
    </div>
    </>
    );
}
