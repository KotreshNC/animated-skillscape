
import React from "react";
import { Linkedin, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks: React.FC = () => {
  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "#",
      color: "bg-[#0077B5]",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "#",
      color: "bg-[#333]",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "#",
      color: "bg-[#1DA1F2]",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "#",
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    },
  ];

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text inline-block mb-2">Let's Connect</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Feel free to reach out for collaborations or just a friendly chat</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handleSocialClick(platform.url)}
              className={`social-icon ${platform.color} group`}
              aria-label={`Visit ${platform.name}`}
            >
              <div className="group-hover:animate-pulse">
                {platform.icon}
              </div>
              <span className="sr-only">{platform.name}</span>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            className="gradient-bg hover:opacity-90 text-white rounded-full px-8 py-6 text-lg flex items-center gap-2"
            onClick={() => window.location.href = "mailto:your-email@example.com"}
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </Button>
          <div className="relative mt-4">
            <p className="text-gray-500 text-sm">
              your-email@example.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
