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



const CreateInsightPage = ()=>{
    const [formData, setFormData] = useState({
        insights_heading:'',
        insights_desc:'',
        insights_sub_one_heading:'',
        insights_sub_one_desc:'',
        insights_sub_one_img_url:'',
        insights_sub_second_heading:'',
        insights_sub_second_desc:'',
        insights_sub_second_img_url:'',
        insights_sub_third_heading:'',
        insights_sub_third_desc:'',
        insights_sub_third_img_url:''
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
          router.push("/admin/insights");
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
        console.error('Failed to fetch insights', response.status);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
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
                          <Label htmlFor="insights_heading" className="text-[15px] font-inter-medium">Insights Heading</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_heading" placeholder="please enter Heading" name="insights_heading" value={formData.insights_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_desc" className="text-[15px] font-inter-medium">Insights Description</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_desc" placeholder="please enter Insights Description" name="insights_desc" value={formData.insights_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_one_heading" className="text-[15px] font-inter-medium">Insights One Sub Heading</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_one_heading" placeholder="please enter Insights One Sub Heading" name="insights_sub_one_heading" value={formData.insights_sub_one_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_one_desc" className="text-[15px] font-inter-medium">Insights Sub One Description</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_one_desc" placeholder="please enter Insights Description" name="insights_sub_one_desc" value={formData.insights_sub_one_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                       <div className="space-y-2 w-[80%]">
                          <FileUpload fieldName="insights_sub_one_img_url" onUpload={handleUpload} initialUrl={formData.insights_sub_one_img_url} />                   
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_second_heading" className="text-[15px] font-inter-medium">Insights Second Sub Heading</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_second_heading" placeholder="please enter Insights Second Sub Heading" name="insights_sub_second_heading" value={formData.insights_sub_second_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_second_desc" className="text-[15px] font-inter-medium">Insights Second Sub Description</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_second_desc" placeholder="please enter Insights Description" name="insights_sub_second_desc" value={formData.insights_sub_second_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <FileUpload fieldName="insights_sub_second_img_url" onUpload={handleUpload} initialUrl={formData.insights_sub_second_img_url} />                   
                      </div>

                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_third_heading" className="text-[15px] font-inter-medium">Insights Third Sub Heading</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_third_heading" placeholder="please enter Insights Second Sub Heading" name="insights_sub_third_heading" value={formData.insights_sub_third_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <Label htmlFor="insights_sub_third_desc" className="text-[15px] font-inter-medium">Insights Third Sub Description</Label>
                          { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                          <Input id="insights_sub_third_desc" placeholder="please enter Insights Description" name="insights_sub_third_desc" value={formData.insights_sub_third_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                          }
                      </div>
                      <div className="space-y-2 w-[80%]">
                          <FileUpload fieldName="insights_sub_third_img_url" onUpload={handleUpload} initialUrl={formData.insights_sub_third_img_url} />                   
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

export default CreateInsightPage;