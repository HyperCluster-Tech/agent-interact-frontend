// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Mic, Send } from "lucide-react";

// export default function FAQPage() {
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");
//   const [isRecording, setIsRecording] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically send the query to your AI agent for processing
//     setResponse(`This is a placeholder response for the query: "${query}"`);
//   };

//   const handleAudioToggle = () => {
//     if (isRecording) {
//       // Stop recording and process audio
//       setIsRecording(false);
//       // In a real implementation, you would process the audio here
//       setQuery("This is a simulated audio input query");
//     } else {
//       // Start recording
//       setIsRecording(true);
//     }
//   };

//   return (
//     <div className="container mx-auto py-12 px-4">
//       <h1 className="text-4xl font-bold mb-8 text-center">Course FAQs</h1>
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>Ask about our Agentic AI Course</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex space-x-2">
//               <Input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Type a question or simply ask one using the mic button"
//                 aria-label="Question input"
//               />
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="icon"
//                 onClick={handleAudioToggle}
//                 aria-label={isRecording ? "Stop recording" : "Start recording"}
//               >
//                 {isRecording ? (
//                   <Send className="h-4 w-4" />
//                 ) : (
//                   <Mic className="h-4 w-4" />
//                 )}
//               </Button>
//             </div>
//           </form>
//           {isRecording && (
//             <div className="mt-4 flex justify-center items-center">
//               <div className="relative w-16 h-16">
//                 <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
//                 <div className="absolute inset-2 bg-primary/40 rounded-full animate-pulse"></div>
//                 <div className="absolute inset-4 bg-primary/60 rounded-full animate-pulse"></div>
//                 <div className="absolute inset-6 bg-primary rounded-full"></div>
//               </div>
//             </div>
//           )}
//           {response && (
//             <div className="mt-6 p-4 bg-muted rounded-md">
//               <h3 className="font-semibold mb-2">Response:</h3>
//               <p>{response}</p>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" onClick={handleSubmit}>
//             Ask
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

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
import { Mic, Send, Sparkles } from "lucide-react";

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
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-indigo-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Course FAQs
        </h1>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-indigo-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Ask about our Agentic AI Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
          <CardFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Ask
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
