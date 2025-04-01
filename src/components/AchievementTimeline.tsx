
import React, { useEffect, useRef } from "react";
import { Award, BookOpen, MessageSquare, Briefcase, Rocket } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

const AchievementTimeline: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Hackathon Winner",
      description: "Won at Utkarsh, demonstrating innovation and technical prowess.",
      icon: <Award className="w-6 h-6 text-portfolio-purple" />,
      year: "2023"
    },
    {
      id: 2,
      title: "Tech & Global Summit Attendee",
      description: "Gained exposure to cutting-edge industry trends and networking opportunities.",
      icon: <BookOpen className="w-6 h-6 text-portfolio-purple" />,
      year: "2022"
    },
    {
      id: 3,
      title: "Strong Communication Skills",
      description: "Presented research and projects at multiple academic and professional events.",
      icon: <MessageSquare className="w-6 h-6 text-portfolio-purple" />,
      year: "2022"
    },
    {
      id: 4,
      title: "Machine Learning Project Experience",
      description: "Completed internship at Subbaiah Medical College, applying ML to healthcare data.",
      icon: <Briefcase className="w-6 h-6 text-portfolio-purple" />,
      year: "2021"
    },
    {
      id: 5,
      title: "Startup Pitch Experience",
      description: "Pitched innovative tech solution at Subjit College, Bangalore.",
      icon: <Rocket className="w-6 h-6 text-portfolio-purple" />,
      year: "2020"
    }
  ];

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
    if (timelineItems) {
      timelineItems.forEach((item) => {
        item.classList.remove("animate-fade-in");
        item.classList.add("opacity-0");
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8" ref={timelineRef}>
      <div className="relative border-l-2 border-portfolio-purple ml-6 space-y-12">
        {achievements.map((achievement, index) => (
          <div 
            key={achievement.id} 
            className="timeline-item opacity-0 relative"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute -left-[34px] top-0">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md">
                {achievement.icon}
              </span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ml-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{achievement.title}</h3>
                <span className="text-sm text-portfolio-purple font-semibold px-3 py-1 bg-portfolio-purple/10 rounded-full">
                  {achievement.year}
                </span>
              </div>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;
