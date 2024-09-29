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
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Our Agentic AI Projects
      </h1>
      <div className="gri d gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={project.url}>View Project</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
