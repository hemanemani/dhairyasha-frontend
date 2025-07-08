"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Github, Linkedin, Twitter, Loader } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState } from "react"
import React from "react"
import AlertMessages from "@/components/AlertMessages"


export default function Home() {

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    subject:'',
    message:''
  })

  const [profileData, setProfileData] = useState({
        banner_content: '',
        banner_image_url:'',
        about_content:'',
        about_img:'',
        project_title:'',
        project_description:'',
        project_image:'',
        contact_email:'',
        contact_description:'',
        facebook:'',
        instagram:'',
        linkedin:''
    });
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
      const res = await fetch("http://localhost:5000/api/admin/message",{
        method:"POST",
        headers: { 
          "Content-Type": "application/json",
       },

        body: JSON.stringify(formData),
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
        const res = await fetch("http://localhost:5000/api/admin/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        setProfileData(data || { 
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
            linkedin: "" });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  });




  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Dhariya Shah</h1>
                  <p className="text-xl text-muted-foreground" >Founder & CEO of MarketPlace</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Pioneering the future of e-commerce with innovative marketplace solutions that connect sellers and
                    buyers worldwide.
                  </p>
                    {profileData && (
                      <p
                        className="text-xl text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.banner_content }}
                      />
                    )}
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button className="w-full min-[400px]:w-auto">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#projects">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      View Projects
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                </div>
              </div>
              {profileData.banner_image_url ? (
                <Image
                  src={`${profileData.banner_image_url}?height=550&width=550`}
                  width={550}
                  height={550}
                  alt="Jane Smith, Founder & CEO"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                />
              ) : null}

             
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  With over 15 years of experience in e-commerce and digital marketplaces
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Jane Smith speaking at a conference"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">Background & Expertise</h3>
                  <p className="text-muted-foreground">
                    I founded MarketPlace in 2015 with a vision to revolutionize how online commerce connects people.
                    Prior to this, I led product development at major tech companies and earned my MBA from Stanford
                    University.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">Mission & Vision</h3>
                  <p className="text-muted-foreground">
                    My mission is to democratize e-commerce by providing powerful tools that enable entrepreneurs to
                    reach global markets. I envision a future where anyone can build a successful online business
                    regardless of their technical expertise.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">Key Achievements</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Grew MarketPlace to over 1 million active sellers</li>
                    <li>Raised $50M in Series B funding (2021)</li>
                    <li>Named "Entrepreneur of the Year" by Tech Innovators (2022)</li>
                    <li>Expanded operations to 15 countries across 4 continents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Showcasing key projects and initiatives that have shaped my journey in e-commerce
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="MarketPlace Platform Launch"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">MarketPlace Platform Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    Led the development and launch of our core marketplace platform, which now powers over 1 million
                    online stores.
                  </p>
                  <Link href="/projects/marketplace-launch">
                    <Button variant="link" className="mt-2 p-0">
                      Read Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Seller Success Program"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">Seller Success Program</h3>
                  <p className="text-sm text-muted-foreground">
                    Created an educational initiative that has helped over 10,000 entrepreneurs scale their businesses
                    on our platform.
                  </p>
                  <Link href="/projects/seller-success">
                    <Button variant="link" className="mt-2 p-0">
                      Read Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Global Expansion Initiative"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">Global Expansion Initiative</h3>
                  <p className="text-sm text-muted-foreground">
                    Spearheaded our international growth strategy, successfully launching in 15 countries across 4
                    continents.
                  </p>
                  <Link href="/projects/global-expansion">
                    <Button variant="link" className="mt-2 p-0">
                      Read Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/projects">
                <Button variant="outline">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a question or interested in collaboration? Reach out using the form below.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <p>connect@shahdhairya.in</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Connect With Me</h3>
                  <p className="text-muted-foreground">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                    vision.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
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
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} w-[40%] bg-black dark:bg-[#fff] dark:text-black text-white capitalize text-[15px] h-[43px] rounded-sm block ml-auto mr-auto mt-10 font-inter-semibold cursor-pointer `}
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
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Dhariya Shah. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

