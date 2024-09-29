import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeamsWithCollision } from "@/components/background-beams";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans">
        Want to build GenAI projects?{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">RAGs to Rich AIs with LLM Agents</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">RAGs to Rich AIs with LLM Agents</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 items-center">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="md:text-lg max-w-sm"
          >
            <Link href="/assessment">Try Demo</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="md:text-lg bg-white text-purple-600 hover:bg-white/90 max-w-sm"
          >
            <Link href="https://pesu.io/courses/">Enroll Now</Link>
          </Button>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
