
import React, { useEffect } from "react";
import Header from "@/components/Header";
import SkillCard from "@/components/SkillCard";
import AchievementTimeline from "@/components/AchievementTimeline";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  useEffect(() => {
    document.body.classList.add('bg-gradient-to-b', 'from-[#1A1F2C]', 'to-[#222]', 'text-white');
    
    return () => {
      document.body.classList.remove('bg-gradient-to-b', 'from-[#1A1F2C]', 'to-[#222]', 'text-white');
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      
      {/* Header with Neural Network Background */}
      <Header />
      
      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text inline-block mb-2">My Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Specialized in machine learning and artificial intelligence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillCard 
              title="Machine Learning" 
              icon="ml"
              description="Experience with various ML algorithms including classification, regression, and clustering."
              animationDelay={100}
            />
            <SkillCard 
              title="Neural Networks" 
              icon="nn"
              description="Designing and implementing neural network architectures for complex problems."
              animationDelay={300}
            />
            <SkillCard 
              title="Deep Learning" 
              icon="dl"
              description="Working with CNN, RNN, and Transformer models for advanced AI applications."
              animationDelay={500}
            />
            <SkillCard 
              title="Coding Knowledge" 
              icon="code"
              description="Proficient in Python, TensorFlow, PyTorch, and other ML frameworks."
              animationDelay={700}
            />
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 sm:px-6 bg-white text-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text inline-block mb-2">Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Key milestones on my journey</p>
          </div>
          
          <AchievementTimeline />
        </div>
      </section>
      
      {/* Social Links Section */}
      <SocialLinks />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
