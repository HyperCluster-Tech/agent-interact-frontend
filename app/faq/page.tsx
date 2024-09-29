"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mic, Send, Sparkles, Loader } from "lucide-react";

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSubmit = async (submittedQuery: string) => {
    if (!submittedQuery) return;
    setIsLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "https://agent-interact.onrender.com/faq_answer",
        {
          question: submittedQuery,
        }
      );
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error fetching FAQ answer:", error);
      setResponse("An error occurred while fetching the answer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      setIsRecording(true);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          const chunks: Blob[] = [];
          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          mediaRecorder.onstop = async () => {
            const audioBlob1 = new Blob(chunks, { type: "audio/wav" });
            setAudioBlob(audioBlob1);
            setIsRecording(false);
            if (audioBlob) {
              await sendAudioQuery(audioBlob);
            }
          };

          mediaRecorder.start();
        } catch (err) {
          console.error("Error accessing microphone:", err);
          setIsRecording(false);
        }
      } else {
        console.error("getUserMedia not supported on your browser.");
      }
    }
  };

  const sendAudioQuery = async (audio: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", new File([audio], "recording.wav"));

    try {
      const res = await axios.post(
        "https://agent-interact.onrender.com/audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const translatedQuery = res.data.translated;
      setQuery(translatedQuery);
      handleSubmit(translatedQuery);
    } catch (error) {
      console.error("Error sending audio to backend:", error);
      setResponse("An error occurred while processing the audio.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-indigo-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Course FAQs
        </h1>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-indigo-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Ask about our course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(query);
              }}
              className="space-y-4"
            >
              <div className="flex space-x-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a question or use the mic..."
                  aria-label="Question input"
                  className="bg-white dark:bg-gray-700 border-indigo-300 dark:border-indigo-500/30 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAudioToggle}
                  aria-label={
                    isRecording ? "Stop recording" : "Start recording"
                  }
                  className="border-indigo-300 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20"
                >
                  {isRecording ? (
                    <Send className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>

            {isLoading && (
              <div className="mt-4 flex justify-center">
                <Loader className="animate-spin h-8 w-8 text-indigo-500" />
              </div>
            )}

            {isRecording && (
              <div className="mt-4 flex justify-center items-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 bg-indigo-500/40 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-indigo-500/60 rounded-full animate-pulse"></div>
                  <div className="absolute inset-6 bg-indigo-500 rounded-full"></div>
                </div>
              </div>
            )}
            {response && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-md border border-indigo-200 dark:border-indigo-500/30">
                <h3 className="font-semibold mb-2 text-indigo-600 dark:text-indigo-400">
                  Response:
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{response}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              onClick={() => handleSubmit(query)}
              className="w-1/3 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Ask"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
