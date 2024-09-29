"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CoursePopup } from "@/components/course-popup";

export default function AssessmentPage() {
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("mcq");
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your AI agent for processing
    console.log({ topic, answerType, answer });
    setShowPopup(true);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Agentic AI Assessment Demo
      </h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Generate a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
              />
            </div>
            <div className="space-y-2">
              <Label>Question Type</Label>
              <RadioGroup
                defaultValue="mcq"
                onValueChange={setAnswerType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mcq" id="mcq" />
                  <Label htmlFor="mcq">Multiple Choice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subjective" id="subjective" />
                  <Label htmlFor="subjective">Subjective</Label>
                </div>
              </RadioGroup>
            </div>
            {question && (
              <div className="space-y-2">
                <Label htmlFor="question">Generated Question</Label>
                <p className="mt-1 p-2 bg-muted rounded-md">{question}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer</Label>
              {answerType === "mcq" ? (
                <RadioGroup onValueChange={setAnswer} className="space-y-2">
                  {/* Placeholder for MCQ options */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="a" />
                    <Label htmlFor="a">Option A</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="b" />
                    <Label htmlFor="b">Option B</Label>
                  </div>
                </RadioGroup>
              ) : (
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                />
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Submit Answer
          </Button>
        </CardFooter>
      </Card>
      {showPopup && <CoursePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
