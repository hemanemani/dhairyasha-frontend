"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCart";
import AlertMessages from "@/components/AlertMessages";
import { Loader } from "lucide-react";
import { API_BASE } from "@/constants/api";
import { DarkMode } from "@/components/dark-mode";
import { FileUpload } from "@/components/admin/fileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";




const CreateMetaPage = ()=>{
    const [formData, setFormData] = useState({
        meta_title:'',
        meta_description:'',
        meta_keywords:'',
        theme:'system',
        favicon_url:'',
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);
    const { setTheme, theme } = useTheme();



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
      const updatedFormData = {
        ...formData,
        theme: theme,
      };

      const res = await fetch(`${API_BASE}/profile`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedFormData),
        mode: 'cors',
      });


      if (res.ok) {
          setIsSuccess(true);
          setTimeout(() => {
                setIsLoading(false);
                setAlertMessage("Site Settings Updated successfully!");
                router.push("/admin/meta");
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
          mode: 'cors',
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
        if (data.theme) setTheme(data.theme);
        setFormData(
        data || {
            meta_title:'',
            meta_description:'',
            meta_keywords:'',
            theme:theme,
            favicon_url:''
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

const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({
          ...prev,
          [field]: value,
        }));
      };
      



    return(
            <div className="mx-auto p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mb-6 mt-4"> 
                       
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="meta_title" className="text-[15px] font-inter-medium">Meta Title</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="meta_title" placeholder="please enter Meta Title" name="meta_title" value={formData.meta_title || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="meta_description" className="text-[15px] font-inter-medium">Meta Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="meta_description" placeholder="please enter Meta Description" name="meta_description" value={formData.meta_description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>  
                         <div className="space-y-2 w-[80%]">
                            <Label htmlFor="meta_keywords" className="text-[15px] font-inter-medium">Meta Keywords</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="meta_keywords" placeholder="please enter Meta Keywords" name="meta_keywords" value={formData.meta_keywords || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div> 
                        
                        <div className="space-y-2 w-[80%]">
                          <Label htmlFor="theme" className="text-[15px] font-inter-medium">Theme Settings</Label>
                          <Select name="theme" value={theme} onValueChange={(value) => setTheme(value)}>
                            <SelectTrigger className="dark:bg-[#111] dark:text-white w-[100%]">
                                <SelectValue placeholder="Select Theme" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-[#111] dark:text-white">
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>     
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="favicon_url" onUpload={handleUpload} initialUrl={formData.favicon_url} />                   
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

export default CreateMetaPage;