"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Linkedin, Loader, Instagram, Facebook } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState } from "react"
import React from "react"
import AlertMessages from "@/components/AlertMessages"
import { StatementsCarousel } from "@/components/statements-carousel"
import { API_BASE } from "@/constants/api"


export default function Home() {

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:''
  })

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
        project_sub_one_heading:"",
        project_sub_one_desc:"",
        project_sub_one_img_url:"",
        project_sub_one_url:"",
        project_sub_second_url:"",
        project_sub_second_heading :"",
        project_sub_second_desc:"",
        project_sub_second_img_url:"",
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
        email:"",
        instagram:"",
        facebook:"",
        linkedin:"",
    });

    const [statementData, setStatementData] = useState({
      statement_heading:"",
        statement_description:"",
        statement_testimonial:[],
    })


    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/message`,{
        method:"POST",
        headers: { 
          "Content-Type": "application/json",
       },

        body: JSON.stringify(formData),
        mode: 'cors',
      })
      if (res.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        setAlertMessage("Form Submitted successfully");
      } else {
        setAlertMessage("Failed to Submit");
        setIsSuccess(false); 
        setIsLoading(false);  

      }
    } catch (error) {
      setAlertMessage("Error submitting form");
        setIsSuccess(false); 
        setIsLoading(false);  
        console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
  
  const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors',
        });
        const data = await res.json();
        setProfileData(data || { 
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
        project_sub_one_heading:"",
        project_sub_one_desc:"",
        project_sub_one_img_url:"",
        project_sub_one_url:"",
        project_sub_second_url:"",
        project_sub_second_heading :"",
        project_sub_second_desc:"",
        project_sub_second_img_url:"",
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
        instagram:"",
        facebook:"",
        linkedin:"",
       });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  });


  useEffect(() => {
  
  const fetchStatements = async () => {
      try {
        const res = await fetch(`${API_BASE}/statements`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors',
        });
        const data = await res.json();
        setStatementData(data || { 
          statement_heading:"",
        statement_description:"",
        statement_testimonial:[]
         });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatements();
  });




  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-3 md:py-6 lg:py-12 xl:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-inter">{profileData.heading}</h1>
                  <p className="text-xl text-muted-foreground" >{profileData.designation}</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {profileData.description}
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
              
                <img
                  src={
                    profileData.home_img_url
                      ? `${profileData.home_img_url}`
                      : '/placeholder.svg?height=550&width=550'
                  }
                  width={550}
                  height={550}
                  alt="DhairyaShah, Founder & CEO"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-101"
                  
                />
              
             
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-3 md:py-6 lg:py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{profileData.about_heading}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.about_desc}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
             <img
                  src={
                    profileData.about_img_url
                      ? `${profileData.about_img_url}`
                      : '/placeholder.svg?height=550&width=550'
                  }
                  width={550}
                  height={550}
                  alt="DhairyaShah, Founder & CEO"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full cursor-pointer transition-transform duration-200 ease-in-out hover:scale-101"
                />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">{profileData.about_sub_one_heading}</h3>
                    {profileData && (
                      <p
                        className="text-md text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.about_sub_one_desc }}
                      />
                    )}
                  
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">{profileData.about_sub_second_heading}</h3>
                    {profileData && (
                      <p
                        className="text-md text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.about_sub_second_desc }}
                      />
                    )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">{profileData.about_sub_third_heading}</h3>
                  {profileData?.about_sub_second_desc && (
                    <div
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: profileData.about_sub_second_desc }}
                    />
                  )}

                </div>
              </div>
               
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-3 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{profileData.project_heading}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.project_desc}
                </p>
              </div>
            </div>
            
            <div className="mx-auto grid gap-8 py-12 sm:grid-cols-2 md:grid-col-6 lg:grid-cols-6">
              <div className="col-span-1"></div>
              <div className="col-span-2 group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden bg-white flex justify-center">
                  <Link href={`${profileData.project_sub_one_url}`}>
                  <img
                  src={
                    profileData.project_sub_one_img_url
                      ? `${profileData.project_sub_one_img_url}`
                      : '/placeholder.svg?height=550&width=550'
                  }
                  width={550}
                  height={550}
                  alt="DhairyaShah, Founder & CEO"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full cursor-pointer transition-transform group-hover:scale-105"
                />
                </Link>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{profileData.project_sub_one_heading}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.project_sub_one_desc}
                  </p>
                  <Button variant="link" className="mt-2 p-0 cursor-pointer" onClick={() => window.open(`${profileData.project_sub_one_url}`, "_blank", "noopener,noreferrer")}>
                      Visit Website
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div className="col-span-2 group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden bg-white flex justify-center">
                  <Link href={`${profileData.project_sub_second_url}`}>
                  <img
                  src={
                    profileData.project_sub_second_img_url
                      ? `${profileData.project_sub_second_img_url}`
                      : '/placeholder.svg?height=550&width=550'
                  }
                  width={550}
                  height={550}
                  alt="DhairyaShah, Founder & CEO"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full cursor-pointer transition-transform group-hover:scale-105"
                />
                </Link>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{profileData.project_sub_second_heading}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.project_sub_second_desc}
                  </p>
                  <Button variant="link" className="mt-2 p-0 cursor-pointer" onClick={() => window.open(`${profileData.project_sub_second_url}`, "_blank", "noopener,noreferrer")}>
                      Visit Website
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div className="col-span-1"></div>

            </div>
            
          </div>
        </section>

         <section id="interests" className="w-full py-3 md:py-6 lg:py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{profileData.insights_heading}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.insights_desc}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
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
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{profileData.insights_sub_one_heading}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_one_desc} 
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
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{profileData.insights_sub_second_heading}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_second_desc}
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
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{profileData.insights_sub_third_heading}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profileData.insights_sub_third_desc} 
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="statements" className="w-full py-3 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{statementData.statement_heading}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {statementData.statement_description}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <StatementsCarousel />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-3 md:py-6 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{profileData.contact_heading}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {profileData.contact_description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Mail className="h-5 w-5" />
                  <p>{profileData.email}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{profileData.contact_sub_heading}</h3>
                  <p className="text-muted-foreground">
                    {profileData.contact_sub_description}
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
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 my-2"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Subject of your message"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} bg-black dark:bg-[#fff] dark:text-black text-white capitalize text-[15px] h-[43px] rounded-sm block ml-auto mr-auto mt-10 font-inter-semibold cursor-pointer `}
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

