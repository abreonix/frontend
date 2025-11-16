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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 mb-4 overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-green-500 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo2.png" 
                  alt="Abreonix Security" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold">Abreonix Cyber Security</div>
                <div className="text-xs text-green-100">online</div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Message Area */}
          <div className="p-4 bg-gray-50">
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
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <button
              onClick={redirectToWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors font-medium mb-2"
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
                className="ml-1 italic text-gray-600 hover:text-gray-800"
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
        className={`w-14 h-14 ml-72 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-green-500 hover:bg-green-600`}
      >
     <FaWhatsapp size={28} className="text-white" />
     
      </button>
    </div>
  );
};

export default WhatsAppBot;