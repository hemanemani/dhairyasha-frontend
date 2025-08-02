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


const CreateStatementPage = ()=>{

      const [formData, setFormData] = useState<{
      statement_heading: string;
      statement_description: string;
      statement_testimonial: { title: string; date: string }[];
    }>({
      statement_heading: "",
      statement_description: "",
      statement_testimonial: [{ title: "", date: "" }]
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
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
      setFormData(response.data);

      if (response.status >= 200 && response.status < 300) {
          setIsSuccess(true);
          setTimeout(() => {
          setIsLoading(false);
          setAlertMessage("Settings Updated");
          router.push("/admin/statements");
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
        console.error('Failed to fetch statements', response.status);
      }
    } catch (error) {
      console.error('Error fetching statements:', error);
    } finally {
      setIsLoading(false);
      setIsInputLoading(false);
    }
  }
      
    fetchSettings();
  }, []);


   

  const addTestimonialField = () => {
    setFormData((prev) => ({
      ...prev,
      statement_testimonial: [
        ...prev.statement_testimonial,
        { title: "", date: "" }
      ]
    }));
  };

  const removeTestimonialField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      statement_testimonial: prev.statement_testimonial.filter((_, i) => i !== index)
    }));
  };

  const handleTestimonialChange = (index: number, field: 'title' | 'date', value: string) => {
      const updatedTestimonials = [...formData.statement_testimonial];
      updatedTestimonials[index][field] = value;

      setFormData((prev) => ({
        ...prev,
        statement_testimonial: updatedTestimonials
      }));
    };



    return(
            <div className="mx-auto p-4 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mb-6 mt-4"> 
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="statement_heading" className="text-[15px] font-inter-medium">Heading</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="statement_heading" placeholder="please enter Heading" name="statement_heading" value={formData.statement_heading || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="statement_description" className="text-[15px] font-inter-medium">Description</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="statement_description" placeholder="please enter Statement Description" name="statement_description" value={formData.statement_description || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div>        
                        <div className="space-y-2">
                          <Label className="text-[15px] font-inter-medium">Statements</Label>

                          {isInputLoading ? (
                            <>
                              <SkeletonCard height="h-[36px] w-[80%]" />
                            </>
                          ) : (
                            formData.statement_testimonial.map((testimonial, index) => (
                              <div key={index} className="flex gap-2 items-center">
                                <Input
                                  placeholder="Statement Title"
                                  name="title"
                                  value={testimonial.title}
                                  onChange={(e) => handleTestimonialChange(index, 'title', e.target.value)}
                                  className="w-[45%] border rounded-md bg-white dark:bg-[#000]"
                                />
                                <Input
                                  placeholder="Statement Date"
                                  name="date"
                                  value={testimonial.date}
                                  onChange={(e) => handleTestimonialChange(index, 'date', e.target.value)}
                                  className="w-[35%] border rounded-md bg-white dark:bg-[#000]"
                                />

                                {/* Add / Remove Button */}
                                <button
                                  type="button"
                                  onClick={() => addTestimonialField()}
                                  className="text-lg text-green-600 px-2"
                                  title="Add new testimonial"
                                >
                                  +
                                </button>

                                {formData.statement_testimonial.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeTestimonialField(index)}
                                    className="text-lg text-red-500 px-2"
                                    title="Remove"
                                  >
                                    −
                                  </button>
                                )}
                              </div>
                            ))
                          )}
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

export default CreateStatementPage;