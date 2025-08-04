"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/fileUpload";
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCart";
import AlertMessages from "@/components/AlertMessages";
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";



const CreateHomePage = ()=>{
    const [formData, setFormData] = useState({
        heading:'',
        designation:'',
        description:'',
        home_img_url:''
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpload = (field: string, uploadedUrl: string) => {
        setFormData({
            ...formData,
            [field]: uploadedUrl
        })
    }

    useEffect(() => {
    const fetchSettings = async () => {
      // setLoading(true); 
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
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
        console.error('Failed to fetch home data', response.status);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setIsLoading(false);
      setIsInputLoading(false);
    }
  }
      
    fetchSettings();
  }, [router]);

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
          router.push("/admin/home");
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

   



    return(
            <div className="mx-auto p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mb-6 mt-4"> 
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="heading" className="text-[15px] font-inter-medium">Heading</Label> {formData.heading}
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="heading" placeholder="please enter Heading" name="heading" value={formData.heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="designation" className="text-[15px] font-inter-medium">Designation</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="designation" placeholder="please enter Designation" name="designation" value={formData.designation || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="description" className="text-[15px] font-inter-medium">Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="description" placeholder="please enter Description" name="description" value={formData.description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>         
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="home_img_url" onUpload={handleUpload} initialUrl={formData.home_img_url} />                   
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

export default CreateHomePage;