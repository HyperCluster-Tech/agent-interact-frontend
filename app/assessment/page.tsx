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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Code, Globe, Brain } from "lucide-react";

export default function AssessmentPage() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answerType, setAnswerType] = useState("mcq");
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your AI agent for processing
    console.log({ subject, topic, answerType, answer });
    setShowPopup(true);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-cyan-900 py-12 px-4 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-800 dark:text-cyan-200">
        Agentic AI Assessment Demo
      </h1>
      <Card className="max-w-2xl mx-auto border-cyan-200 dark:border-cyan-700 shadow-lg dark:shadow-cyan-900/20">
        <CardHeader className="bg-cyan-50 dark:bg-cyan-900/50 border-b border-cyan-100 dark:border-cyan-800">
          <CardTitle className="text-2xl text-cyan-800 dark:text-cyan-200">
            Generate a Question
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-cyan-700 dark:text-cyan-300"
              >
                Subject
              </Label>
              <Select onValueChange={setSubject}>
                <SelectTrigger className="border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500 dark:focus:ring-cyan-400">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">
                    <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      Python for Computational Problem Solving
                    </div>
                  </SelectItem>
                  <SelectItem value="web">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Web Technologies
                    </div>
                  </SelectItem>
                  <SelectItem value="ml">
                    <div className="flex items-center">
                      <Brain className="mr-2 h-4 w-4" />
                      Machine Learning
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="topic"
                className="text-cyan-700 dark:text-cyan-300"
              >
                Topic
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                className="border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500 dark:focus:ring-cyan-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-700 dark:text-cyan-300">
                Question Type
              </Label>
              <RadioGroup
                defaultValue="mcq"
                onValueChange={setAnswerType}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="mcq"
                    id="mcq"
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                  <Label htmlFor="mcq" className="dark:text-cyan-200">
                    Multiple Choice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="subjective"
                    id="subjective"
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                  <Label htmlFor="subjective" className="dark:text-cyan-200">
                    Subjective
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {question && (
              <div className="space-y-2">
                <Label
                  htmlFor="question"
                  className="text-cyan-700 dark:text-cyan-300"
                >
                  Generated Question
                </Label>
                <p className="mt-1 p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-100 dark:border-cyan-800 text-cyan-800 dark:text-cyan-200">
                  {question}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="answer"
                className="text-cyan-700 dark:text-cyan-300"
              >
                Your Answer
              </Label>
              {answerType === "mcq" ? (
                <RadioGroup onValueChange={setAnswer} className="space-y-2">
                  {/* Placeholder for MCQ options */}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="a"
                      id="a"
                      className="text-cyan-600 dark:text-cyan-400"
                    />
                    <Label htmlFor="a" className="dark:text-cyan-200">
                      Option A
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="b"
                      id="b"
                      className="text-cyan-600 dark:text-cyan-400"
                    />
                    <Label htmlFor="b" className="dark:text-cyan-200">
                      Option B
                    </Label>
                  </div>
                </RadioGroup>
              ) : (
                <Textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500 dark:focus:ring-cyan-400 dark:bg-gray-800 dark:text-cyan-100"
                />
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-cyan-50 dark:bg-cyan-900/50 border-t border-cyan-100 dark:border-cyan-800 items-center">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white transition-colors duration-300 mt-4"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Submit Answer
          </Button>
        </CardFooter>
      </Card>
      {showPopup && <CoursePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
