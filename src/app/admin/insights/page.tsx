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
                router.push("/admin/insights");
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