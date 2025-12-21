"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Trash2,
  Loader2,
  Award,
  BookOpen,
  FileText
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'like' | 'dislike';
}

interface StudentChatbotProps {
  student: any;
}

export default function StudentChatbot({ student }: StudentChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello ${student?.name || 'Student'}! I'm ONIX, your AI learning assistant for ${student?.course.name || 'your course'}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("studentToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/student`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Simulate typing delay
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.reply,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);

    } catch (error: any) {
      console.error("Chat error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: `Hello ${student?.name || 'Student'}! I'm ONIX, your AI learning assistant for ${student?.course.name || 'your course'}. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 max-h-screen">
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <CardTitle>ONIX AI Assistant</CardTitle>
                  <CardDescription>
                    {isTyping ? "Typing..." : "Online • Ready to help"}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Powered by AI
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Chat Messages */}
            <ScrollArea className="h-[370px] p-4" ref={scrollAreaRef}>
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.sender === 'user' ? (
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className={`flex-1 ${message.sender === 'user' ? 'items-end' : ''}`}>
<div
  className={`rounded-2xl px-4 py-3 max-w-[80%] ${
    message.sender === 'user'
      ? 'bg-blue-600 text-white ml-auto'
      : 'bg-gray-100 text-gray-900'
  }`}
>
  <div className={`prose prose-sm max-w-none ${
    message.sender === "user" ? "prose-invert" : ""
  }`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {message.text}
    </ReactMarkdown>
  </div>
                        <div className={`flex items-center justify-between mt-2 text-xs ${
                          message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          
                          {message.sender === 'bot' && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className={`h-6 w-6 ${
                                  message.feedback === 'like' 
                                    ? 'text-green-600 bg-green-50' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                                onClick={() => handleFeedback(message.id, 'like')}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className={`h-6 w-6 ${
                                  message.feedback === 'dislike' 
                                    ? 'text-red-600 bg-red-50' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                                onClick={() => handleFeedback(message.id, 'dislike')}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-gray-400 hover:text-gray-600"
                                onClick={() => handleCopyText(message.text)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        <span className="text-gray-500">ONIX is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>


            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask me anything about ${student?.course.name || "your course"}...`}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </CardContent>
        </Card>

 {/* Chat Info & Features */}
        <div className="space-y-6">
          {/* Chat Features */}
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <CardDescription>What ONIX can help you with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Course Content</p>
                    <p className="text-sm text-gray-500">Explain topics, clarify concepts</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Assignment Help</p>
                    <p className="text-sm text-gray-500">Guidance on assignments & projects</p>
                  </div>
                </div>

              

                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">24/7 Support</p>
                    <p className="text-sm text-gray-500">Available anytime you need help</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-600">1</span>
                  </div>
                  <span>Be specific with your questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-600">2</span>
                  </div>
                  <span>Ask about specific topics or chapters</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-600">3</span>
                  </div>
                  <span>Request examples or explanations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-600">4</span>
                  </div>
                  <span>Use feedback buttons to improve responses</span>
                </li>
                    <li className="flex items-start gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-blue-600">5</span>
                  </div>
                  <span>Use For Study</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}