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
import { API_BASE } from "@/constants/api";
import TinyEditor from "@/components/admin/TinyEditor";



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

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("You are not logged in. Please log in first.");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      });


      if (res.ok) {
          setIsSuccess(true);
          setTimeout(() => {
                setIsLoading(false);
                setAlertMessage("Site Settings Updated successfully!");
                router.push("/admin/about");
                }, 2000)
      } else {
          if (res.status === 403) {
              localStorage.removeItem("adminToken");
              router.push("/login");
              return;
          }
          setAlertMessage("Failed to updated");
          setIsSuccess(false); 
          setIsLoading(false);
          throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setAlertMessage("Something Went Wrong...");
      setIsSuccess(false);
      setIsLoading(false);
      console.error(err);
    }
  };


   useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          mode: 'cors'
        });
        if (!res.ok) {
            if (res.status === 403) {
                localStorage.removeItem("adminToken");
                router.push("/login");
                return;
            }
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setFormData(
        data || {
            about_heading:'',
            about_desc:'',
            about_sub_one_heading:'',
            about_sub_one_desc:'',
            about_sub_second_heading:'',
            about_sub_second_desc:'',
            about_sub_third_heading:'',
            about_sub_third_desc:'',
            about_img_url:''
        }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsInputLoading(false);
        setIsLoading(false);
      }
    };

    fetchSettings();
}, [router]);



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