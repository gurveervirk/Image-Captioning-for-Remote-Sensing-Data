// src/components/Predict.jsx
import React, { useState,useEffect } from 'react';
import Navbar from './Navbar';
import useLoggedIn from '../hooks/useLoggedIn';

const Predict = () => {

 useLoggedIn();
 const [image, setImage] = useState(null);
 const [caption, setCaption] = useState('');
 const [loading, setLoading] = useState(false);
 const [previewUrl, setPreviewUrl] = useState('');

 

 const handleImageChange = (e) => {
    const file = e.target.files[0]; // Retrieve the selected file
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  useEffect(() => {
    console.log(caption);
  }, [caption]);
    
 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/predict', {
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = (await response.json()).data;
        setLoading(false);
      setCaption(data.caption);
      console.log(caption);
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
 };
console.log(previewUrl);
 return (
 <>
 <Navbar/>
 <div className="container mx-auto p-4 flex flex-col items-center pt-16">
 <h1 className="text-5xl font-bold mb-4">Predict Image Caption</h1>
 <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleImageChange}
      />
    </div>
    {previewUrl && (
      <div className="mt-4">
        {/* Ensure the image maintains its original size */}
        <img src={previewUrl} alt="Selected" className="w-auto h-auto mx-auto" />
      </div>
    )}
    <div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Predict Caption
      </button>
    </div>
 </form>
 <h2 className="text-2xl font-bold mb-2">Predicted Caption:</h2>
 {loading ? (
    <div className="mt-4">
      <p>Loading...</p>
    </div>
 ) : (
    <div className="mt-4">
      <p>{caption}</p>
    </div>
 )}
</div>


 </>
);
};

export default Predict;
