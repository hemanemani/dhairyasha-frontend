"use client"

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

type Image = {
  name: string;
  url: string;
};



const CreateUploadPage = ()=>{
  const [images, setImages] = useState<Image[]>([]);


  useEffect(() => {
    const fetchMessages = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User is not authenticated.");
      return;
    }

    try {
      const response = await axiosInstance.get('/images', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response && response.data) {
        setImages(response.data);
      } else {
        console.error("Failed to fetch home data", response.status);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
      
    fetchMessages();
  }, []);
    

const handleDelete = async (filename:string) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User is not authenticated.");
      return;
    }

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this message?");
      if (!confirmDelete) return;

      const response = await axiosInstance.delete(`/images/${filename}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 204) {
        setImages(images.filter(img => img.name !== filename));
        console.log("✅ image deleted successfully");
      } else {
        console.error("❌ Failed to delete message", response.status);
      }
    } catch (error) {
      console.error("❌ Error deleting message:", error);
    }
  };



    return(
            <div className="mx-auto p-4 space-y-6">
                <div className="grid grid-cols-6 gap-4">
                    {images.map((img) => (
                    <div key={img.name} className="relative">
                        <img src={img.url} alt={img.name} className="rounded-lg" />
                        <button
                        onClick={() => handleDelete(img.name)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                        >
                        Delete
                        </button>
                    </div>
                    ))}
                </div>
            </div>

    )

}

export default CreateUploadPage;