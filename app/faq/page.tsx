"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, Send } from "lucide-react";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the query to your AI agent for processing
    setResponse(`This is a placeholder response for the query: "${query}"`);
  };

  const handleAudioToggle = () => {
    if (isRecording) {
      // Stop recording and process audio
      setIsRecording(false);
      // In a real implementation, you would process the audio here
      setQuery("This is a simulated audio input query");
    } else {
      // Start recording
      setIsRecording(true);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Course FAQs</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ask about our Agentic AI Course</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a question or simply ask one using the mic button"
                aria-label="Question input"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAudioToggle}
                aria-label={isRecording ? "Stop recording" : "Start recording"}
              >
                {isRecording ? (
                  <Send className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
          {isRecording && (
            <div className="mt-4 flex justify-center items-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-primary/60 rounded-full animate-pulse"></div>
                <div className="absolute inset-6 bg-primary rounded-full"></div>
              </div>
            </div>
          )}
          {response && (
            <div className="mt-6 p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit}>
            Ask
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
