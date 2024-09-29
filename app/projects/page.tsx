import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Vehicular Technician Assistant",
    description:
      "A project built by us for Bosch as part of a collaborative project between PESU Centre of Cognitive and Computational Intelligence (C3I)",
    tech: "Agentic RAG",
    url: "https://bosch-the-builder.vercel.app/",
  },
  {
    title: "AlienWear",
    description:
      "An AI-powered fashion e-commerce platform that leverages vector search to provide semantic search capabilities",
    tech: "Naive RAG",
    url: "https://github.com/samarth777/AlienWear",
  },
  {
    title: "Scholarize",
    description:
      "A platform to automate the extraction, processing, and summarization of publication records for faculty profile building. Being built for Smart India Hackathon",
    tech: "Multi-Agent Framework",
    url: "https://www.youtube.com/watch?v=uz_MYfRQu0U",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-blue-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold pb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse">
          Our Agentic AI Projects
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="dark:bg-gray-800 border border-blue-500/20 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              <CardHeader className="bg-gradient-to-br from-blue-200 to-blue-100 dark:from-gray-700 dark:to-gray-800">
                <CardTitle className="text-2xl font-bold text-blue-400">
                  {project.title}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  <p className="mb-2">{project.description}</p>
                  <p>{project.tech}</p>
                </CardDescription>
              </CardHeader>
              <CardFooter className="dark:bg-gray-900 p-4">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  <Link href={project.url}>Explore Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
