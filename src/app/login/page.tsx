"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye,EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DarkMode } from "@/components/dark-mode";
import { API_BASE } from "@/constants/api";


const LoginPage: React.FC = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");


    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

      e.preventDefault();
      setNameError(!email.trim());
      setPasswordError(!password.trim());
      setLoginError("");

      if (!email.trim() || !password.trim()) {
        return;
      }
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE}/login`,{
          method : "POST",
          headers:  {"Content-Type": "application/json"},
          body:JSON.stringify({email,password})
        })

        const data = await res.json();


        if (!res.ok) {
          setIsLoading(false);
          setNameError(true);
          setPasswordError(true);
          setLoginError(data.message || "Invalid credentials. Try again.");
          return;
        }
        localStorage.setItem("adminToken", data.token);
          setTimeout(() => {
            setIsLoading(false);
            router.push("/admin/messages");
          }, 1000);

          
      } catch (error) {
        setIsLoading(false);
        setNameError(true);
        setPasswordError(true);
        setLoginError(error ? "Invalid Credentials. Try again" : '');
      }
      
  
      };


      useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (token) {
          router.replace("/admin/messages");
        }
      }, []);



    return (
        <div className="grid w-full min-h-screen grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="px-16 md:px-20 lg:px-20 xl:px-44 flex flex-col justify-center bg-white dark:bg-black border-r-2 dark:border-[#000] border-[#ececec] pl-0">
              <h2 className="text-4xl font-inter-extrabold text-center mb-3">Sign In</h2>
              <p className="text-[#838389] mb-12 text-center font-inter-light text-[15px]">Enter your Email and Password to sign in</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="email" className="text-[15px] font-inter-medium">Email</Label>
                    <Input id="email" 
                    type="text"
                    placeholder="Please enter email" 
                    className={`mt-2 border ${nameError ? 'border-red-500' : 'border-[#bfbfbf]'} focus:border-black font-inter-light`} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    autoComplete="email"
                    disabled={isLoading}
                    />
                  {/* {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>} */}

                </div>
                <div>
                  
                  <div className="relative mt-2">
                  <Label htmlFor="password" className="text-[15px] font-inter-medium">Password</Label>
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Please enter password"
                      className={`mt-2 border ${passwordError ? 'border-red-500' : 'border-[#bfbfbf]'} focus:border-black font-inter-light`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      disabled={isLoading}
                  />
                  
                  
                  <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer top-7"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                  >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  </div>
                  {/* {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>} */}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading} // Disable button while loading
                    className={`w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""} mt-10 h-[40px] bg-black text-white dark:bg-white dark:text-black hover:bg-black text-[16px] cursor-pointer flex justify-center items-center font-inter-semibold`}
                  >
                    {isLoading ? (
                      <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <div className="relative">
                    {loginError && (
                      <p className="text-sm text-red-500 text-center absolute top-0 left-0 w-full">
                        {loginError}
                      </p>
                    )}
                  </div>
               
              </form>


          </div>

          {/* Right Section - Branding */}
          <div className="md:flex flex-col items-center justify-center p-8 bg-transparent">
              <h1 className="text-[50px] font-inter-extrabold">Dhairya Shah</h1>
              <p className="text-[#8e8e8e] font-inter-light">Admin Login</p>
          </div>
          <div className="absolute right-2 top-2">
            <div className=" dark:bg-[#1e2939] bg-white mr-2 rounded-lg">
              <DarkMode />
            </div>  
          </div>
        </div>
    )
}

export default LoginPage;