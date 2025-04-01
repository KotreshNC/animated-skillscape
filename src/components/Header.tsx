
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import NeuralNetworkAnimation from "./NeuralNetworkAnimation";

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NeuralNetworkAnimation />
      </div>
      <div className="z-10 max-w-3xl text-center px-4 sm:px-6 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 gradient-text">
          Hi, I'm <span className="gradient-text">Your Name</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Machine Learning Enthusiast & Tech Innovator
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            className="bg-portfolio-purple hover:bg-portfolio-purple-dark text-white rounded-full px-8 py-6 text-lg"
            onClick={() => scrollToSection("skills")}
          >
            View My Skills
          </Button>
          <Button 
            variant="outline" 
            className="border-portfolio-purple text-portfolio-purple hover:bg-portfolio-purple/10 rounded-full px-8 py-6 text-lg flex items-center gap-2"
          >
            <Download size={20} />
            Download Resume
          </Button>
        </div>
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-float"
          onClick={() => scrollToSection("skills")}
        >
          <ArrowDown size={30} className="text-portfolio-purple animate-pulse-light" />
        </div>
      </div>
    </header>
  );
};

export default Header;
