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
import TinyEditor from "@/components/admin/TinyEditor";
import axiosInstance from "@/lib/axios";



const CreateAboutPage = ()=>{
    const [formData, setFormData] = useState({
        about_heading:'',
        about_desc:'',
        about_sub_one_heading:'',
        about_sub_one_desc:'',
        about_sub_second_heading:'',
        about_sub_second_desc:'',
        about_sub_third_heading:'',
        about_sub_third_desc:'',
        about_img_url:''
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
      setFormData(response.data);

      if (response.status >= 200 && response.status < 300) {
          setIsSuccess(true);
          setTimeout(() => {
          setIsLoading(false);
          setAlertMessage("Settings Updated");
          router.push("/admin/about");
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
        console.error('Failed to fetch about data', response.status);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
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
                            <Label htmlFor="about_heading" className="text-[15px] font-inter-medium">About Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="about_heading" placeholder="please enter Heading" name="about_heading" value={formData.about_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_desc" className="text-[15px] font-inter-medium">About Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="about_desc" placeholder="please enter About Description" name="about_desc" value={formData.about_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_one_heading" className="text-[15px] font-inter-medium">About One Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="about_sub_one_heading" placeholder="please enter About One Sub Heading" name="about_sub_one_heading" value={formData.about_sub_one_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_one_desc" className="text-[15px] font-inter-medium">About One Sub Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[400px]" /> :
                            <TinyEditor
                            id="about_sub_one_desc"
                            name="about_sub_one_desc"
                            value={formData.about_sub_one_desc || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                about_sub_one_desc: content,
                                }))
                            }
                            />
                          }
                        </div>   
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_second_heading" className="text-[15px] font-inter-medium">About Second Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="about_sub_second_heading" placeholder="please enter About Second Sub Heading" name="about_sub_second_heading" value={formData.about_sub_second_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_second_desc" className="text-[15px] font-inter-medium">About Second Sub Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[400px]" /> :
                            <TinyEditor
                            id="about_sub_second_desc"
                            name="about_sub_second_desc"
                            value={formData.about_sub_second_desc || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                about_sub_second_desc: content,
                                }))
                            }
                            />
                          }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_third_heading" className="text-[15px] font-inter-medium">About Third Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="about_sub_third_heading" placeholder="please enter About Third Sub Heading" name="about_sub_third_heading" value={formData.about_sub_third_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_sub_third_desc" className="text-[15px] font-inter-medium">About Third Sub Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[400px]" /> :
                            <TinyEditor
                            id="about_sub_third_desc"
                            name="about_sub_third_desc"
                            value={formData.about_sub_third_desc || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                about_sub_third_desc: content,
                                }))
                            }
                            />
                          }
                        </div>          
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="about_img_url" onUpload={handleUpload} initialUrl={formData.about_img_url} />                   
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

export default CreateAboutPage;