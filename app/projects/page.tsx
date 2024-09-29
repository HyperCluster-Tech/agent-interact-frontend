import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AI Writing Assistant",
    description:
      "An intelligent agent that helps with writing and editing tasks.",
    url: "https://example.com/ai-writing-assistant",
  },
  {
    title: "Smart Home Controller",
    description:
      "An AI-powered system for managing smart home devices efficiently.",
    url: "https://example.com/smart-home-controller",
  },
  {
    title: "Personal Finance Advisor",
    description:
      "An AI agent that provides personalized financial advice and planning.",
    url: "https://example.com/finance-advisor",
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
                  {project.description}
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
