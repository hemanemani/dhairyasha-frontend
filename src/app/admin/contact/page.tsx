"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCart";
import AlertMessages from "@/components/AlertMessages";
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";



const CreateContactPage = ()=>{
    const [formData, setFormData] = useState({
        contact_heading:'',
        contact_description:'',
        contact_sub_heading:'',
        contact_sub_description:'',
        email:''
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


     const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await axiosInstance.put('/profile',formData,{
        headers: {
            'Authorization': `Bearer ${token}`,
        },
      })

      setFormData((prev) => ({
        ...prev,
        ...response.data,
      }));
      
      if (response.status >= 200 && response.status < 300) {
          setIsSuccess(true);
          setTimeout(() => {
          setIsLoading(false);
          setAlertMessage("Settings Updated");
          router.push("/admin/contact");
          }, 2000);      
      } else {
          setAlertMessage("Failed to add settings");
          setIsSuccess(false); 
          setIsLoading(false);    
          console.error("Failed to add", response.status);
      }  

      
    } catch (err) {
      setAlertMessage("Something Went Wrong...");
      setIsSuccess(false);
      setIsLoading(false);
      console.error(err);
    }
  };

   useEffect(() => {
    const fetchSettings = async () => {
      // setLoading(true); 
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("User is not authenticated.");
      // setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response && response.data) {
        setFormData(response.data);
      } else {
        console.error('Failed to fetch contact data', response.status);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    } finally {
      setIsLoading(false);
      setIsInputLoading(false);
    }
  }
      
    fetchSettings();
  }, []);


    return(
            <div className="mx-auto p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mb-6 mt-4"> 
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_heading" className="text-[15px] font-inter-medium">Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="contact_heading" placeholder="please enter Heading" name="contact_heading" value={formData.contact_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_description" className="text-[15px] font-inter-medium">Contact Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="contact_description" placeholder="please enter Description" name="contact_description" value={formData.contact_description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_sub_heading" className="text-[15px] font-inter-medium">Contact Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="contact_sub_heading" placeholder="please enter Contact Heading" name="contact_sub_heading" value={formData.contact_sub_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_sub_description" className="text-[15px] font-inter-medium">Contact Sub Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="contact_sub_description" placeholder="please enter Sub Description" name="contact_sub_description" value={formData.contact_sub_description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>           
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="email" className="text-[15px] font-inter-medium">Email</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="email" placeholder="please enter Email" name="email" value={formData.email || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>  
                    </div>

                    <Button 
                      type="submit"
                      className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} bg-black dark:bg-[#fff] dark:text-black text-white capitalize text-[15px] h-[43px] rounded-sm block ml-auto mr-auto mt-10 font-inter-semibold cursor-pointer `}
                      disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader className="h-5 w-5 animate-spin block ml-auto mr-auto" />
                      ) : (
                          "Update Settings"
                        )}
                      </Button>
                      {alertMessage && (
                          <AlertMessages message={alertMessage} isSuccess={isSuccess!} />
                      )}
                    
                </form>
            </div>

    )

}

export default CreateContactPage;