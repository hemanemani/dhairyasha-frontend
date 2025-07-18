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


const CreateProjectsPage = ()=>{
    const [formData, setFormData] = useState({
        project_heading:'',
        project_desc:'',
        project_sub_one_heading:'',
        project_sub_one_desc:'',
        project_sub_one_img_url:'',
        project_sub_second_heading:'',
        project_sub_second_desc:'',
        project_sub_second_img_url:'',
        project_sub_one_url:'',
        project_sub_second_url:''

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
        method: "PATCH",
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
                router.push("/admin/projects");
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
        setFormData(
        data || {
            project_heading:'',
            project_desc:'',
            project_sub_one_heading:'',
            project_sub_one_desc:'',
            project_sub_one_img_url:'',
            project_sub_one_url:'',
            project_sub_second_heading:'',
            project_sub_second_desc:'',
            project_sub_second_img_url:'',
            project_sub_second_url:''
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
                            <Label htmlFor="project_heading" className="text-[15px] font-inter-medium">Project Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_heading" placeholder="please enter Heading" name="project_heading" value={formData.project_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_desc" className="text-[15px] font-inter-medium">Project Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_desc" placeholder="please enter Project Description" name="project_desc" value={formData.project_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_one_heading" className="text-[15px] font-inter-medium">Project One Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_one_heading" placeholder="please enter Project One Sub Heading" name="project_sub_one_heading" value={formData.project_sub_one_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_one_desc" className="text-[15px] font-inter-medium">Project Sub One Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_one_desc" placeholder="please enter Project Description" name="project_sub_one_desc" value={formData.project_sub_one_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_one_url" className="text-[15px] font-inter-medium">Project Sub One Link</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_one_url" placeholder="please enter Project Description" name="project_sub_one_url" value={formData.project_sub_one_url || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_second_heading" className="text-[15px] font-inter-medium">Project Second Sub Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_second_heading" placeholder="please enter Project Second Sub Heading" name="project_sub_second_heading" value={formData.project_sub_second_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_second_desc" className="text-[15px] font-inter-medium">Project Second Sub Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_second_desc" placeholder="please enter Project Description" name="project_sub_second_desc" value={formData.project_sub_second_desc || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_sub_second_url" className="text-[15px] font-inter-medium">Project Sub Second Link</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="project_sub_second_url" placeholder="please enter Project Description" name="project_sub_second_url" value={formData.project_sub_second_url || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>

                              
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="project_sub_one_img_url" onUpload={handleUpload} initialUrl={formData.project_sub_one_img_url} />                   
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="project_sub_second_img_url" onUpload={handleUpload} initialUrl={formData.project_sub_second_img_url} />                   
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

export default CreateProjectsPage;