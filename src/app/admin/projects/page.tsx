"use client"

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/admin/fileUpload";
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCart";
import AlertMessages from "@/components/AlertMessages";
import { Loader, Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface ProjectItem {
    heading: string;
    desc: string;
    url: string;
    img_url: string;
}

// Component for uploading project images
const ProjectImageUpload = ({ index, onUpload, initialUrl }: { index: number; onUpload: (index: number, url: string) => void; initialUrl?: string }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(initialUrl || null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setPreview(initialUrl || null);
    }, [initialUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploaded = e.target.files?.[0];
        if (uploaded) {
            setFile(uploaded);
            setPreview(URL.createObjectURL(uploaded));
            setUploadStatus(null);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setFile(null);
        setUploadStatus(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onUpload(index, '');
    };

    const handleUploadToServer = async () => {
        if (!file) return;
        setUploading(true);
        setUploadStatus(null);

        const formData = new FormData();
        formData.append(`project_img_${index}`, file);
        formData.append("_method", "PUT");

        try {
            const token = localStorage.getItem("authToken");
            const res = await axiosInstance.post("/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = res.data;
            // Get the uploaded URL from the response - check data.data first, then data
            const uploadedUrl = data.data?.[`project_img_${index}`] || data[`project_img_${index}`];

            if (uploadedUrl) {
                setPreview(uploadedUrl as string);
                setUploadStatus("Uploaded");
                onUpload(index, uploadedUrl as string);
            } else {
                setUploadStatus("⚠️ Upload succeeded, but URL not found");
                console.error("Upload succeeded, but URL not found in response", data);
            }
        } catch (error) {
            setUploadStatus("❌ Upload Failed");
            console.error("Upload error", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2 border p-4 rounded-md">
            <Label htmlFor={`project_img_${index}`}>Project Image</Label>
            <Input
                id={`project_img_${index}`}
                type="file"
                onChange={handleChange}
                disabled={uploading}
                ref={inputRef}
            />
            {preview && (
                <div className="mt-4 relative inline-block">
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center z-10"
                        title="Remove Image"
                    >
                        ✖
                    </button>
                    <img
                        src={preview}
                        alt="preview"
                        className="h-24 w-auto rounded border"
                    />
                    <button
                        onClick={handleUploadToServer}
                        disabled={uploading}
                        type="button"
                        className="bg-black dark:bg-[#fff] dark:text-black px-4 text-white capitalize text-[15px] h-[40px] rounded-sm mt-2 font-inter-semibold cursor-pointer"
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                    {uploadStatus && (
                        <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                            {uploadStatus}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

const CreateProjectsPage = ()=>{
    const [formData, setFormData] = useState({
        project_heading:'',
        project_desc:'',
        projects: [] as ProjectItem[]
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProjectChange = (index: number, field: keyof ProjectItem, value: string) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            [field]: value
        };
        setFormData({
            ...formData,
            projects: updatedProjects
        });
    };

    const handleProjectImageUpload = (index: number, uploadedUrl: string) => {
        const updatedProjects = [...formData.projects];
        updatedProjects[index] = {
            ...updatedProjects[index],
            img_url: uploadedUrl
        };
        setFormData({
            ...formData,
            projects: updatedProjects
        });
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [
                ...formData.projects,
                { heading: '', desc: '', url: '', img_url: '' }
            ]
        });
    };

    const removeProject = (index: number) => {
        const updatedProjects = formData.projects.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            projects: updatedProjects
        });
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
      
      // Prepare data with projects as JSON string
      const submitData = {
        ...formData,
        projects: JSON.stringify(formData.projects)
      };
      
      const response = await axiosInstance.put('/profile', submitData, {
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
          router.push("/admin/projects");
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
        const data = response.data;
        let projects: ProjectItem[] = [];
        
        if (data.projects) {
          // Parse projects JSON string or use array directly
          if (typeof data.projects === 'string') {
            try {
              projects = JSON.parse(data.projects);
            } catch (e) {
              console.error('Error parsing projects JSON:', e);
              projects = [];
            }
          } else if (Array.isArray(data.projects)) {
            projects = data.projects;
          }
        }
        
        setFormData({
          project_heading: data.project_heading || '',
          project_desc: data.project_desc || '',
          projects: projects
        });
      } else {
        console.error('Failed to fetch projects', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
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
                    </div>

                    {/* Dynamic Projects List */}
                    <div className="space-y-6 mt-8">
                        <div className="flex items-center justify-between">
                            <Label className="text-[15px] font-inter-medium">Projects</Label>
                            <Button
                                type="button"
                                onClick={addProject}
                                className="flex items-center gap-2 bg-black dark:bg-[#fff] dark:text-black text-white capitalize text-[15px] h-[40px] rounded-sm px-4 font-inter-semibold cursor-pointer"
                            >
                                <Plus className="h-4 w-4" />
                                Add Project
                            </Button>
                        </div>

                        {formData.projects.map((project, index) => (
                            <div key={index} className="border rounded-lg p-6 space-y-4 relative">
                                <div className="absolute top-4 right-4">
                                    <Button
                                        type="button"
                                        onClick={() => removeProject(index)}
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8 rounded-full"
                                        title="Delete Project"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`project_${index}_heading`} className="text-[15px] font-inter-medium">Sub Heading</Label>
                                        { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                                        <Input 
                                            id={`project_${index}_heading`}
                                            placeholder="Enter Sub Heading" 
                                            value={project.heading || ''}  
                                            onChange={(e) => handleProjectChange(index, 'heading', e.target.value)} 
                                            className="w-full border rounded-md bg-white dark:bg-[#000]"
                                        />
                                        }
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`project_${index}_desc`} className="text-[15px] font-inter-medium">Sub Description</Label>
                                        { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                                        <Input 
                                            id={`project_${index}_desc`}
                                            placeholder="Enter Sub Description" 
                                            value={project.desc || ''}  
                                            onChange={(e) => handleProjectChange(index, 'desc', e.target.value)} 
                                            className="w-full border rounded-md bg-white dark:bg-[#000]"
                                        />
                                        }
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`project_${index}_url`} className="text-[15px] font-inter-medium">Sub Link</Label>
                                        { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                                        <Input 
                                            id={`project_${index}_url`}
                                            placeholder="Enter Project Link" 
                                            value={project.url || ''}  
                                            onChange={(e) => handleProjectChange(index, 'url', e.target.value)} 
                                            className="w-full border rounded-md bg-white dark:bg-[#000]"
                                        />
                                        }
                                    </div>
                                    <div className="space-y-2">
                                        <ProjectImageUpload 
                                            index={index}
                                            onUpload={handleProjectImageUpload}
                                            initialUrl={project.img_url}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {formData.projects.length === 0 && !isInputLoading && (
                            <div className="text-center py-8 text-muted-foreground border rounded-lg">
                                No projects added yet. Click "Add Project" to get started.
                            </div>
                        )}
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