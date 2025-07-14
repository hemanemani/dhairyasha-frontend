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
import { DatePicker } from "@/components/admin/date-picker";
import { format,parse } from "date-fns";

type StatementData = {
  statement_heading:'',
  statement_description:'',
  statement_testmonial:'',
  statement_date:'',
}

const CreateStatementPage = ()=>{
    const [formData, setFormData] = useState({
        statement_heading:'',
        statement_description:'',
        statement_testmonial:'',
        statement_date:'',
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


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
        body: JSON.stringify(formData)
      });


      if (res.ok) {
          setIsSuccess(true);
          setTimeout(() => {
                setIsLoading(false);
                setAlertMessage("Site Settings Updated successfully!");
                router.push("/admin/statements");
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
            statement_heading:'',
            statement_description:'',
            statement_testmonial:''
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

const handleDateChange = (date: Date | undefined, field: keyof StatementData) => {
      setFormData((prev) => ({
        ...prev,
        [field]: date ? format(date, "dd-MM-yyyy") : undefined, // ✅ Keep "DD-MM-YYYY" format for backend
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
                        <div className="space-y-2 w-[80%]">
                            <Label htmlFor="statement_testmonial" className="text-[15px] font-inter-medium">Testimonail</Label>
                            { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                            <Input id="statement_testmonial" placeholder="please enter Statement Testimonail" name="statement_testmonial" value={formData.statement_testmonial || ''}  onChange={handleChange} className="w-full border rounded-md bg-white dark:bg-[#000]"/>
                            }
                        </div> 
                        <div className="space-y-2 w-[80%]">
                          <Label htmlFor="inquiryDate" className="text-[15px] font-inter-medium">Inquiry Date</Label>
                          <div className={`bg-white dark:bg-[#000] rounded-md border border-red-500`}>
                          <DatePicker
                            id="inquiryDate"
                            date={formData.statement_date ? parse(formData.statement_date, "dd-MM-yyyy", new Date()) : undefined} 
                            setDate={(date) => handleDateChange(date, "statement_date")}
                            placeholder="DD-MM-YYYY"
                            disabled={isLoading}
                          />
                          </div>
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