"use client";
import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const WhatsAppBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const redirectToWhatsApp = () => {
    window.open('https://wa.me/918690650532', '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-[90vw] max-w-80 sm:w-80 mb-3 sm:mb-4 overflow-hidden border border-gray-200 animate-scale-in">
          {/* Header */}
          <div className="bg-green-500 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo2.png" 
                  alt="Abreonix Security" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base">Abreonix Cyber Security</div>
                <div className="text-xs text-green-100">online</div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <FaTimes size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>

          {/* Message Area */}
          <div className="p-3 sm:p-4 bg-gray-50">
            <div className="mb-2">
              <div className="text-sm font-medium text-gray-700">Craw Cyber Security</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                Hi,{'\n'}How can I help you?
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="px-3 sm:px-4 py-3 bg-white border-t border-gray-200">
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium mb-2 text-sm sm:text-base"
            >
              Get Info
            </button>
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span className="mr-1">⚡</span>
              by{' '}
              <a 
                href="https://ai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 italic text-gray-600 hover:text-gray-800 text-xs"
              >
                AbreBot
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={toggleChat}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95 ml-72 ${
          isOpen ? 'rotate-0' : 'rotate-0'
        }`}
        aria-label="WhatsApp Chat"
      >
        <FaWhatsapp 
          size={24} 
          className="text-white w-6 h-6 sm:w-7 sm:h-7" 
        />
      </button>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .fixed {
            bottom: 1rem;
            right: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .fixed {
            bottom: 0.75rem;
            right: 0.75rem;
          }
        }
        
        /* Ensure the widget doesn't overflow on very small screens */
        @media (max-width: 320px) {
          .max-w-80 {
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppBot;