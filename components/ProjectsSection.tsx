"use client"

import Image from "next/image"

interface Project {
  name: string
  description: string
  image: string
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce solution with payment integration and inventory management",
      image: "/ecommerce-web-app-dashboard.jpg",
    },
    {
      name: "Task Manager",
      description: "Collaborative task management tool with real-time updates and team features",
      image: "/task-management-app.png",
    },
    {
      name: "Weather Dashboard",
      description: "Real-time weather tracking application with interactive maps and forecasts",
      image: "/weather-dashboard-maps.png",
    },
    {
      name: "Portfolio Generator",
      description: "Automated portfolio website generator with customizable templates and themes",
      image: "/portfolio-website-builder.png",
    },
  ]

  return (
    <section id="projects" className="min-h-screen py-12 px-6">
      <div className="border-2 border-black rounded-3xl p-8 lg:p-12 bg-white">
        <h2 className="text-3xl font-bold font-mono mb-8 text-black">projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border-2 border-black rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden border-2 border-black">
                <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold font-mono mb-2 text-black">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
