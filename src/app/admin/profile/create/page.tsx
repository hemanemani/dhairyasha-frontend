"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/fileUpload";
import TinyEditor from "@/components/admin/TinyEditor";
import { useRouter } from "next/navigation"


type Profile = {
  id: number;
  banner_content: string;
  banner_image_url:string;
  about_content:string;
  about_image_url:string;
  project_title:string;
  project_description:string;
  project_image_url:string;
  contact_email:string;
  contact_description:string;
  facebook:string;
  instagram:string;
  linkedin:string;
};

const CreateProfilePage = ()=>{
    const [formData, setFormData] = useState({
        banner_content: '',
        banner_image_url:'',
        about_content:'',
        about_image_url:'',
        project_title:'',
        project_description:'',
        project_image_url:'',
        contact_email:'',
        contact_description:'',
        facebook:'',
        instagram:'',
        linkedin:''
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);


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
    const res = await fetch("http://localhost:5000/api/admin/profile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });


    if (res.ok) {
      alert("Site Settings Updated successfully!");
    } else {
        if (res.status === 403) {
            localStorage.removeItem("adminToken");
            router.push("/login");
            return;
        }
        throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting form");
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
        const res = await fetch("http://localhost:5000/api/admin/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
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
            banner_content: "",
            banner_image_url: "",
            about_content: "",
            about_image_url: "",
            project_title: "",
            project_description: "",
            project_image_url: "",
            contact_email: "",
            contact_description: "",
            facebook: "",
            instagram: "",
            linkedin: ""
        }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
}, [router]);



    return(
            <div className="mx-auto p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 mb-6 mt-4">
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="banner_content" className="text-[15px] font-inter-medium">Banner Content</Label>
                            <TinyEditor
                            id="banner_content"
                            name="banner_content"
                            value={formData.banner_content || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                banner_content: content,
                                }))
                            }
                            />

                            
                        </div>          
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="banner_image_url" onUpload={handleUpload} initialUrl={formData.banner_image_url} />                   
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="about_content" className="text-[15px] font-inter-medium">About Content</Label>
                            <TinyEditor
                            id="about_content"
                            name="about_content"
                            value={formData.about_content || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                about_content: content,
                                }))
                            }
                            />
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="about_image_url" onUpload={handleUpload} />
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_title" className="text-[15px] font-inter-medium">Project Title</Label>
                            <Input id="project_title" placeholder="enter project name" name="project_title" value={formData.project_title || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]" />
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="project_description" className="text-[15px] font-inter-medium">Project Description</Label>
                            <Input id="project_description" placeholder="enter project description" name="project_description" value={formData.project_description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <FileUpload fieldName="project_image_url" onUpload={handleUpload} />
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_email" className="text-[15px] font-inter-medium">Contact Email</Label>
                            <Input id="contact_email" placeholder="enter contact email" name="contact_email" value={formData.contact_email || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                        </div>

                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="contact_description" className="text-[15px] font-inter-medium">Contact Content</Label>
                            <TinyEditor
                            id="contact_description"
                            name="contact_description"
                            value={formData.contact_description || ""}
                            onChange={(content) =>
                                setFormData((prev) => ({
                                ...prev,
                                contact_description: content,
                                }))
                            }
                            />
                        </div>

                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="instagram" className="text-[15px] font-inter-medium">Instagram</Label>
                            <Input id="instagram" placeholder="enter contact instagram" name="instagram" value={formData.instagram || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="facebook" className="text-[15px] font-inter-medium">Facebook</Label>
                            <Input id="facebook" placeholder="enter contact facebook" name="facebook" value={formData.facebook || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="linkedin" className="text-[15px] font-inter-medium">LinkedIn</Label>
                            <Input id="linkedin" placeholder="enter contact linkedin" name="linkedin" value={formData.linkedin || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                        </div>

                    </div>
                    
                    <Button type="submit">Submit</Button>
                </form>
            </div>

    )

}

export default CreateProfilePage;