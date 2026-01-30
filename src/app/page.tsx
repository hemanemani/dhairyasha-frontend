"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Linkedin, Loader, Instagram, Facebook } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState } from "react"
import React from "react"
import AlertMessages from "@/components/AlertMessages"
import { StatementsCarousel } from "@/components/statements-carousel"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { SkeletonCard } from "@/components/SkeletonCart"


export default function Home() {

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:''
  })

  const router = useRouter();



  const [profileData, setProfileData] = useState({
        heading: "", 
        description: "", 
        designation:"",
        home_img_url: "",
        about_heading:"",
        about_desc:"",
        about_sub_one_heading : "",
        about_sub_one_desc:"",
        about_sub_second_heading:"",
        about_sub_second_desc:"",
        about_sub_third_heading:"",
        about_sub_third_desc:"",
        about_img_url:"",
        project_heading:"",
        project_desc:"",
        projects: [] as Array<{ heading: string; desc: string; url: string; img_url: string }>,
        insights_heading:"",
        insights_desc: "", 
        insights_sub_one_heading: "", 
        insights_sub_one_desc:"",
        insights_sub_one_img_url: "",
        insights_sub_second_heading:"",
        insights_sub_second_desc:"",
        insights_sub_second_img_url : "",
        insights_sub_third_heading:"",
        insights_sub_third_desc:"",
        insights_sub_third_img_url:"",
        contact_heading:"",
        contact_description:"",
        contact_sub_heading:"",
        contact_sub_description:"",
        statement_heading:'',
        statement_description:'',
        statement_testimonial:[],
        email:"",
        instagram:"",
        facebook:"",
        linkedin:"",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInputLoading, setIsInputLoading] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(true);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      
      const response = await axiosInstance.post('/messages',formData,{
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
          router.push("/");
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
    try {
      const response = await axiosInstance.get("/home");
      if (response && response.data) {
        const data = response.data;
        
        // Handle projects JSON field - parse if it's a string, use directly if it's an array
        let projects: Array<{ heading: string; desc: string; url: string; img_url: string }> = [];
        
        if (data.projects) {
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
        
        setProfileData({
          ...data,
          projects: projects
        });
      } else {
        console.error("Failed to fetch home data", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch home data", error);
    } finally {
      setIsLoading(false);
      setIsInputLoading(false);

    }
  };

  fetchSettings();
}, []);



  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-6 md:py-6 lg:py-12 xl:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                
                <div className="space-y-2">
                  
                  <h1 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-inter-inter">{profileData.heading || "Dhairya Shah"}</h1>
                  <p className="text-xl text-muted-foreground" >{profileData.designation || 'Founder & CEO of Orgenik'}</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {profileData.description || 'Driving India’s Organic Agricultural Revolution through innovation, trust, and accessibility.'}
                  </p>
                 
                </div>
                
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button className="w-full min-[400px]:w-auto cursor-pointer">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                    
                  <Link href="#projects">
                    <Button variant="outline" className="w-full min-[400px]:w-auto cursor-pointer">
                      View Projects
                    </Button>
                  </Link>
                </div>
                
                <div className="flex gap-4">
                  <Link href={`${profileData.facebook}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </Link>
                  <Link href={`${profileData.instagram}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </Link>
                  <Link href={`${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Linkedin</span>
                    </Button>
                  </Link>
                </div>
                
              </div>
              {isImageLoading && <SkeletonCard height="h-[550px]" />}

              <div className="group mx-auto aspect-square overflow-hidden rounded-xl">
              <img
                src={
                  profileData.home_img_url
                    ? `${profileData.home_img_url}`
                    : "/placeholder.svg?height=550&width=550"
                }
                width={550}
                height={550}
                alt="DhairyaShah, Founder & CEO"
                className="mx-auto h-full w-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                onLoad={() => setIsImageLoading(false)}
              />
            </div> 
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-6 md:py-6 lg:py-12 dark:bg-[#161616] bg-[#f5f5f5]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              
              <div className="space-y-2">
                <h2 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl text-black dark:text-white">{profileData.about_heading || 'About Me'}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.about_desc || "I'm not just building a company. I'm building a movement around purpose and performance."}
                </p>
              </div>
              
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 py-2 md:py-12  lg:py-12 xl:py-12 lg:grid-cols-2 lg:gap-12">
              <div className="group mx-auto aspect-square overflow-hidden rounded-xl">
                { isImageLoading && <SkeletonCard height="h-[550px]" /> }

             <img
                  src={
                    profileData.about_img_url
                      ? `${profileData.about_img_url}`
                      : '/placeholder.svg?height=550&width=550'
                  }
                  width={550}
                  height={550}
                  alt="DhairyaShah, Founder & CEO"
                  className="mx-auto h-full w-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                  onLoad={() => setIsImageLoading(false)}
                />
                </div>
                
              <div className="flex flex-col justify-center space-y-4">
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-inter-bold tracking-tighter text-black dark:text-white">{profileData.about_sub_one_heading || "Background and Expertise"}</h3>
                  <>
                    {profileData.about_sub_one_desc ? (
                      <p
                        className="text-md text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.about_sub_one_desc }}
                      />
                    ) : (
                      <p>
                        I founded Orgenik in 2020 with a vision to revolutionize how India connects with Luxurious and Ethical Lifestyle products—making conscious living both accessible and aspirational. 
                        Prior to this, I immersed myself in diverse business functions through internships at companies like Deloitte and several other companies—gaining hands-on exposure across Management, Finance, Marketing, HR, and Operations. These experiences grounded my understanding of how businesses work beyond theory. 
                        As a go-getter by nature, I believe real-world challenges teach more than any classroom.
                      </p>
                    )}
                  </>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-inter-bold tracking-tighter text-black dark:text-white">{profileData.about_sub_second_heading || "Mission and Vision"}</h3>
                    {profileData.about_sub_second_desc ? (
                      
                      <p
                        className="text-md text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.about_sub_second_desc }}
                      />
                      ) : (
                      <p>
                        My mission is to empower a new India—where organic isn’t just an option, but a standard. Through Orgenik and its ecosystem, I work to make clean, certified, and honest products accessible to everyone, while creating real value for farmers and grassroots producers. 
                        I envision leading an Organic Agricultural Revolution by 2030—a bold shift that transforms how we grow, consume, and think about food. It’s not just about business; it’s about building a future rooted in sustainability, transparency, and impact. 
                      </p>
                    
                    )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-inter-bold tracking-tighter text-black dark:text-white">{profileData.about_sub_third_heading || "Key Achievements"}</h3>
                  {profileData?.about_sub_third_desc ? (
                    <div
                      className="text-md text-muted-foreground list-disc pl-5"
                      dangerouslySetInnerHTML={{ __html: profileData.about_sub_third_desc }}
                    />
                  ) : (
                      <ul className="text-md text-muted-foreground list-disc pl-5 space-y-2">
                        <li>
                          Founded Orgenik (2020)—a pioneering Luxurious and Ethical Lifestyle marketplace delivering best quality products across India.
                        </li>
                        <li>
                          Launched Orgenik Bulk—India’s first marketplace for certified organic and pure natural products in bulk supporting farmers, manufacturers, brands and other industries.
                        </li>
                        <li>
                          Built deep partnerships with farmer producer groups and grassroots communities to revive GI-tag products headed toward extinction.
                        </li>
                      </ul>
                  )}
                

                </div>
                
              </div>
               
            </div>
          </div>
        </section>
    

        <section id="projects" className="w-full py-6 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              
              <div className="space-y-2">
                <h2 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl">{profileData.project_heading || "Projects"}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.project_desc || "This is where vision turns real — and ventures are built with intention, purpose, and scale in mind." }
                </p>
              </div>
              
            </div>
            
            <div className="mx-auto grid gap-2 py-2 md:py-12 md:gap-8 lg:py-12 xl:py-12 lg:gap-8 xl:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {profileData.projects && profileData.projects.length > 0 ? (
                profileData.projects.map((project, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-lg border">
                    <div className="aspect-video overflow-hidden bg-white flex justify-center">
                      <Link
                        href={project.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={
                            project.img_url
                              ? project.img_url
                              : "/placeholder.svg?height=550&width=550"
                          }
                          width={500}
                          alt={project.heading || "Project Image"}
                          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full cursor-pointer transition-transform group-hover:scale-105"
                          style={{ height: "-webkit-fill-available", width:"500px" }}
                        />
                      </Link>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-inter-bold mb-2">{project.heading || "Project Title"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.desc || "Project description"}
                      </p>
                      {project.url && (
                        <Button variant="link" className="mt-2 p-0 cursor-pointer" onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}>
                          Visit Website
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No projects available.
                </div>
              )}
            </div>
            
            
          </div>
        </section>

         <section id="interests" className="w-full py-6 md:py-6 lg:py-12 dark:bg-[#161616] bg-[#f5f5f5]">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl text-black dark:text-white">{profileData.insights_heading || "Interests"}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.insights_desc || "Exploring the space where impact, innovation, and intention come together."}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-2 py-4 sm:grid-cols-2 lg:grid-cols-3 md:py-12 md:gap-8 lg:py-12 xl:py-12 lg:gap-8 xl:gap-12">
              
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={
                    profileData.insights_sub_one_img_url
                      ? `${profileData.insights_sub_one_img_url}`
                      : '/placeholder.svg?height=300&width=500'
                  }
                    width={500}
                    height={300}
                    alt="The Future of E-Commerce"
                    className="object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    style={{ height: "-webkit-fill-available" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-inter-bold mb-2">{profileData.insights_sub_one_heading || "AI"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_one_desc || "I’m fascinated by AI’s potential to transform industries, from finance to farming. I explore how intelligent systems can optimize decision-making and empower human potential."} 
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={
                    profileData.insights_sub_second_img_url
                      ? `${profileData.insights_sub_second_img_url}`
                      : '/placeholder.svg?height=300&width=500'
                  }
                    width={500}
                    height={300}
                    alt="The Future of E-Commerce"
                    className="object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    style={{ height: "-webkit-fill-available" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-inter-bold mb-2">{profileData.insights_sub_second_heading || "Agriculture"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_second_desc || "To me, agriculture is the original economy and the future of resilience. I work to bridge technology and tradition to uplift farmers and regenerate our soil."}
                  </p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={
                    profileData.insights_sub_third_img_url
                      ? `${profileData.insights_sub_third_img_url}`
                      : '/placeholder.svg?height=300&width=500'
                  }
                    width={500}
                    height={300}
                    alt="The Future of E-Commerce"
                    className="object-cover transition-transform group-hover:scale-105 cursor-pointer"
                    style={{ height: "-webkit-fill-available" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-inter-bold mb-2">{profileData.insights_sub_third_heading || "Sustainable E-commerce"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_third_desc || "I’m building a new commerce ecosystem—where sustainability isn't a feature but the foundation. I’m building systems where sustainability, ethics, and innovation drive every transaction."} 
                  </p>
                 
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section id="statements" className="w-full py-6 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
             
              <div className="space-y-2">
                <h2 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl">{profileData.statement_heading || "Recent Statements"}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {profileData.statement_description || "Simple thoughts that reflect the work, the process, and the purpose behind it."}
                </p>
              </div>
              
            </div>
            <div className="mx-auto max-w-5xl py-4">
              
              <StatementsCarousel />
              
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-2 md:py-6 lg:py-6">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              
              <div className="space-y-2">
                <h2 className="text-3xl font-inter-bold tracking-tighter sm:text-5xl">{profileData.contact_heading || "Get in Touch"}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.contact_description || "Have a question or interested in collaboration? Reach out using the form below."}
                </p>
              </div>
              
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-6 md:grid-cols-2">
              <div className="space-y-4">
                
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Mail className="h-5 w-5" />
                  <p>{profileData.email || "connect@shahdhairya.in"}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-inter-bold">{profileData.contact_sub_heading || "Connect With Me"}</h3>
                  <p className="text-muted-foreground">
                    {profileData.contact_sub_description || "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Link href={`${profileData.facebook}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="cursor-pointer">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </Link>
                  <Link href={`${profileData.instagram}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="cursor-pointer">
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </Link>
                  <Link href={`${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="cursor-pointer">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">Linkedin</span>
                    </Button>
                  </Link>
                </div>
                
              </div>
              <div className="space-y-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-inter-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-2"
                      >
                        Name
                      </label>
                      { isInputLoading ? <SkeletonCard height="h-[36px]" /> : 
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-inter-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        placeholder="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-inter-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-inter-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      }
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-inter-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    { isInputLoading ? <SkeletonCard height="h-[36px]" /> :
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-inter-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                      placeholder="Subject of your message"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    }
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-inter-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    { isInputLoading ? <SkeletonCard height="h-[120px]" /> :
                    <textarea
                      id="message"
                      name="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    }
                  </div>
                  <Button 
                    type="submit"
                    className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} bg-black dark:bg-[#fff] dark:text-black text-white capitalize text-[15px] h-[43px] rounded-sm block ml-auto mr-auto mt-10 font-inter-inter-semibold cursor-pointer `}
                    disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className="h-5 w-5 animate-spin block ml-auto mr-auto" />
                    ) : (
                        "Send Message"
                      )}
                    </Button>
                    {alertMessage && (
                        <AlertMessages message={alertMessage} isSuccess={isSuccess!} />
                    )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Dhairya Shah. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

