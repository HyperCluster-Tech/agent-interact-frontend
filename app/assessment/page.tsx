"use client";

import { useState } from "react";
import axios from "axios";
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
import { Code, Globe, Brain, Loader } from "lucide-react"; // Import Loader icon

interface Question {
  question: string;
  options?: string[];
  correct_answer?: string;
  model_answer?: string;
}

interface Evaluation {
  grade: string;
  feedback: string;
}

export default function AssessmentPage() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questionType, setQuestionType] = useState("mcq");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  // Function to generate questions
  const generateQuestions = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://agent-interact.onrender.com/generate_questions",
        {
          topic: subject + topic,
          question_type: questionType,
          num_questions: numQuestions,
        }
      );
      console.log(response);
      setQuestions(response.data.questions);
      setCurrentQuestionIndex(0);
      setUserAnswer("");
      setEvaluation(null);
      setIsAnswerSubmitted(false);
    } catch (error) {
      console.error("Error generating questions:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // // Function to submit an answer
  // const submitAnswer = async () => {
  //   setLoading(true); // Start loading
  //   try {
  //     const currentQuestion = questions[currentQuestionIndex];
  //     console.log(currentQuestion);
  //     const response = await axios.post(
  //       "https://agent-interact.onrender.com/evaluate_answer",
  //       {
  //         question: currentQuestion.question,
  //         user_answer: userAnswer,
  //         correct_answer:
  //           currentQuestion.correct_answer || currentQuestion.model_answer,
  //       }
  //     );
  //     setEvaluation(response.data);
  //     setShowPopup(true);
  //     setIsAnswerSubmitted(true);
  //   } catch (error) {
  //     console.error("Error submitting answer:", error);
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) {
      // Alert the user if no answer is provided
      // alert("Please select or write an answer before submitting.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const currentQuestion = questions[currentQuestionIndex];
      console.log(currentQuestion);
      const response = await axios.post(
        "https://agent-interact.onrender.com/evaluate_answer",
        {
          question: currentQuestion.question,
          user_answer: userAnswer,
          correct_answer:
            currentQuestion.correct_answer || currentQuestion.model_answer,
        }
      );
      setEvaluation(response.data);
      setShowPopup(true);
      setIsAnswerSubmitted(true);
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setEvaluation(null);
      setIsAnswerSubmitted(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-cyan-900 py-12 px-4 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-800 dark:text-cyan-200">
        Agentic AI Assessment Demo
      </h1>
      <Card className="max-w-2xl mx-auto border-cyan-200 dark:border-cyan-700 shadow-lg dark:shadow-cyan-900/20">
        <CardHeader className="bg-cyan-50 dark:bg-cyan-900/50 border-b border-cyan-100 dark:border-cyan-800">
          <CardTitle className="text-2xl text-cyan-800 dark:text-cyan-200">
            Generate Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 bg-white dark:bg-gray-900">
          <form className="space-y-6">
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
                  <SelectItem value="python ">
                    <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      Python for Computational Problem Solving
                    </div>
                  </SelectItem>
                  <SelectItem value="web dev">
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4" />
                      Web Technologies
                    </div>
                  </SelectItem>
                  <SelectItem value="databases ">
                    <div className="flex items-center">
                      <Brain className="mr-2 h-4 w-4" />
                      Database Management System
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
                onValueChange={setQuestionType}
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
            <div className="space-y-2">
              <Label
                htmlFor="numQuestions"
                className="text-cyan-700 dark:text-cyan-300"
              >
                Number of Questions (max 5)
              </Label>
              <Input
                id="numQuestions"
                type="number"
                min="1"
                max="5"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                className="border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500 dark:focus:ring-cyan-400"
              />
            </div>
            <Button
              type="button"
              onClick={generateQuestions}
              className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white transition-colors duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                "Generate Questions"
              )}
            </Button>
          </form>
        </CardContent>
        {questions.length > 0 && (
          <CardContent className="pt-6 bg-white dark:bg-gray-900">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <p className="mt-1 p-4 bg-cyan-50 dark:bg-cyan-900/30 rounded-md border border-cyan-100 dark:border-cyan-800 text-cyan-800 dark:text-cyan-200">
                {questions[currentQuestionIndex].question}
              </p>
              <div className="space-y-2">
                <Label
                  htmlFor="answer"
                  className="text-cyan-700 dark:text-cyan-300"
                >
                  Your Answer
                </Label>
                {questionType === "mcq" &&
                questions[currentQuestionIndex]?.options ? (
                  <RadioGroup
                    onValueChange={setUserAnswer}
                    className="space-y-2"
                  >
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${index}`}
                            className="text-cyan-600 dark:text-cyan-400"
                          />
                          <Label
                            htmlFor={`option-${index}`}
                            className="dark:text-cyan-200"
                          >
                            {option}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                ) : (
                  <Textarea
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="border-cyan-200 dark:border-cyan-700 focus:ring-cyan-500 dark:focus:ring-cyan-400 dark:bg-gray-800 dark:text-cyan-100"
                  />
                )}
              </div>
              {/* <Button
                type="button"
                onClick={submitAnswer}
                className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white transition-colors duration-300"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  "Submit Answer"
                )}
              </Button> */}
              <Button
                type="button"
                onClick={submitAnswer}
                className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white transition-colors duration-300"
                disabled={loading || !userAnswer.trim()} // Disable button if loading or no answer
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  "Submit Answer"
                )}
              </Button>
              {isAnswerSubmitted &&
                currentQuestionIndex < questions.length - 1 && (
                  <Button
                    type="button"
                    onClick={handleNextQuestion}
                    className="ml-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-cyan-800 dark:text-cyan-200 transition-colors duration-300"
                  >
                    Next Question
                  </Button>
                )}
            </div>
          </CardContent>
        )}
        {evaluation && (
          <CardFooter className="bg-cyan-50 dark:bg-cyan-900/50 border-t border-cyan-100 dark:border-cyan-800 flex-col items-start">
            <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 my-2">
              Evaluation
            </h3>
            <p className="text-cyan-800 dark:text-cyan-200">
              Grade: {evaluation.grade}
            </p>
            <p className="text-cyan-800 dark:text-cyan-200">
              Feedback: {evaluation.feedback}
            </p>
          </CardFooter>
        )}
      </Card>
      {showPopup && <CoursePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
