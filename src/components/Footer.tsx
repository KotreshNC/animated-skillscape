
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-gray-200">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Kotresha Chavadihindal. All rights reserved.
            </p>
          </div>
          
          <div className="text-gray-600 text-sm">
            <p>Created with ❤️ and React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
