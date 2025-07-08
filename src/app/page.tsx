"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Github, Linkedin, Twitter, Loader } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { useEffect, useState } from "react"
import React from "react"
import AlertMessages from "@/components/AlertMessages"
import { StatementsCarousel } from "@/components/statements-carousel"


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
                  <p className="text-xl text-muted-foreground" >Founder & CEO of Orgenik</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Driving India’s Organic Agricultural Revolution through innovation, trust, and accessibility.
                  </p>
                    {/* {profileData && (
                      <p
                        className="text-xl text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: profileData.banner_content }}
                      />
                    )} */}
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
                    I founded Orgenik in 2020 with a vision to revolutionize how India connects with Luxurious and Ethical Lifestyle products—making conscious living both accessible and aspirational. <br/>Prior to this, I immersed myself in diverse business functions through internships at companies like Deloitte and several other companies—gaining hands-on exposure across Management, Finance, Marketing, HR, and Operations. These experiences grounded my understanding of how businesses work beyond theory. As a go‑getter by nature, I believe real‑world challenges teach more than any classroom. 
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">Mission & Vision</h3>
                  <p className="text-muted-foreground">
                    My mission is to empower a new India—where organic isn’t just an option, but a standard. Through Orgenik and its ecosystem, I work to make clean, certified, and honest products accessible to everyone, while creating real value for farmers and grassroots producers. <br /> 
                    I envision leading an Organic Agricultural Revolution by 2030—a bold shift that transforms how we grow, consume, and think about food. It’s not just about business; it’s about building a future rooted in sustainability, transparency, and impact. 
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tighter">Key Achievements</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    <li>Founded Orgenik (2020)—a pioneering Luxurious and Ethical Lifestyle marketplace delivering best quality products across India. </li>
                    <li>Launched Orgenik Bulk—India’s first marketplace for certified organic and pure natural products in bulk supporting farmers, manufacturers, brands and other industries. </li>
                    <li>Built deep partnerships with farmer producer groups and grassroots communities to revive GI-tag products headed toward extinction. </li>
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
            <div className="mx-auto grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-2 w-[700px]">
              <div className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video bg-white flex justify-center align-center">
                  <Image
                    src="https://www.orgenik.com/public/uploads/all/gV5J3ZeDWgZuZisN3Okp3UjVXZOWRXOScsw87WrS.svg?height=300&width=220"
                    width={220}
                    height={300}
                    alt="MarketPlace Platform Launch"
                    className="object-fill transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">B2C Marketplace</h3>
                  <p className="text-sm text-muted-foreground">
                    A lifestyle ecommerce marketplace offering certified organic, natural, handmade, and luxury wellbeing products from across India, with rigorous verification to ensure quality, sustainability and ethical sourcing.
                  </p>
                    <Button variant="link" className="mt-2 p-0 cursor-pointer" onClick={() => window.open("https://orgenik.com", "_blank", "noopener,noreferrer")}>
                      Visit Website
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border">
                <div className="aspect-video overflow-hidden bg-white flex justify-center">
                  <Image
                    src="https://www.orgenikbulk.com/public/uploads/all/vvVABZyzxjJumLKAniMjBVxWNYyLkkYSBDGPESDf.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Seller Success Program"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">B2B Marketplace </h3>
                  <p className="text-sm text-muted-foreground">
                    A B2B platform for bulk certified organic and natural products procurement—flours, pulses, spices, oils, beverages—designed for hospitality, healthcare, institutions, gifting, and retail. Supplies are fully traceable and sourced directly from manufacturers, brands, growers, and verified farmer groups. 
                  </p>
                  <Button variant="link" className="mt-2 p-0 cursor-pointer" onClick={() => window.open("https://www.orgenikbulk.com/", "_blank", "noopener,noreferrer")}>
                      Visit Website
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
              </div>
              
            </div>
            
          </div>
        </section>

         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Interests</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Thoughts and perspectives on e-commerce, entrepreneurship, and digital innovation
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="The Future of E-Commerce"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">June 12, 2023</p>
                  <h3 className="text-xl font-bold">AI</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    I’m fascinated by AI’s potential to transform industries, from finance to farming. I explore how intelligent systems can optimize decision-making and empower human potential. 
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Building a Resilient Business"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">May 3, 2023</p>
                  <h3 className="text-xl font-bold">Agriculture</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    To me, agriculture is the original economy and the future of resilience. I work to bridge technology and tradition to uplift farmers and regenerate our soil. 
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-background">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    width={500}
                    height={300}
                    alt="Sustainable E-Commerce"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">April 18, 2023</p>
                  <h3 className="text-xl font-bold">Sustainable E-commerce </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    I’m building a new commerce ecosystem—where sustainability isn't a feature but the foundation. I’m building systems where sustainability, ethics, and innovation drive every transaction. 
                  </p>
                 
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recent Statements</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Key insights and perspectives shared at conferences, interviews, and industry events
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <StatementsCarousel />
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
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
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

