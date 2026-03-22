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
import { Textarea } from "@/components/ui/textarea";
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
  BookOpen,
  FileText,
  MessageSquare,
  Zap,
  ChevronRight,
  Menu,
  X,
  Search,
  Bookmark,
  Download,
  Share2,
  MoreVertical,
  Mic,
  Smile,
  Clock,
  Check,
  CheckCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'like' | 'dislike';
  status?: 'sent' | 'delivered' | 'read';
}

interface StudentChatbotProps {
  student: any;
}

export default function StudentChatbot({ student }: StudentChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello **${student?.name || 'Student'}**! I'm **ONIX**, your AI learning assistant for **${student?.course?.name || 'your course'}**. 

I'm here to help you with:
  **Course Content** - Explanations, concepts, materials
  **Assignments** - Guidance, clarifications, examples
  **Scheduling** - Deadlines, study plans, reminders
  **Progress** - Performance tracking, tips

What would you like to learn about today?`,
      sender: 'bot',
      timestamp: new Date(),
      status: 'read'
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarView, setSidebarView] = useState("history");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customMessage) setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const token = localStorage.getItem("studentToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/student`,
        { message: messageToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update user message status to delivered
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
      ));

      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.reply,
          sender: 'bot',
          timestamp: new Date(),
          status: 'read'
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1500);

    } catch (error: any) {
      console.error("Chat error:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. If the problem persists, check your internet connection or contact support.",
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
    // You can add a toast notification here if needed
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        text: `Hello **${student?.name || 'Student'}**! I'm **ONIX**, your AI learning assistant for **${student?.course?.name || 'your course'}**. 

I'm here to help you with:
  **Course Content** - Explanations, concepts, materials
  **Assignments** - Guidance, clarifications, examples
  **Scheduling** - Deadlines, study plans, reminders
  **Progress** - Performance tracking, tips

What would you like to learn about today?`,
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Chat history for sidebar
  const chatHistory = [
    { id: 1, title: "Course Introduction", preview: "What's covered in week 1?", time: "10:30 AM", unread: false },
    { id: 2, title: "Assignment Help", preview: "Need help with the physics problem...", time: "Yesterday", unread: true },
    { id: 3, title: "Study Tips", preview: "Best ways to prepare for finals", time: "2 days ago", unread: false },
    { id: 4, title: "Project Requirements", preview: "Clarification on group project...", time: "1 week ago", unread: false },
  ];


  const renderStatusIcon = (status?: Message['status'], sender?: 'user' | 'bot') => {
    if (sender !== 'user') return null;
    
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (

    <div className="flex h-[calc(90vh-4rem)] bg-gradient-to-br from-gray-50 to-blue-50/30 position-sticky ">
      {/* Mobile Sidebar Toggle */}
      

      {/* Sidebar - Chat History & Features */}
      <div className={cn(
        "fixed lg:relative lg:flex flex-col w-72 lg:w-80 lg: hidden bg-white/95 backdrop-blur-sm border-r border-gray-200/50 h-full transition-all duration-300 z-40 shadow-lg lg:shadow-none ",
        showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        

       
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative">
              <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700">
                  <Bot className="h-6 w-6 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">ONIX Assistant</h2>
              <p className="text-xs text-gray-500 font-medium">AI Tutor • {student?.course?.code || "CS101"}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleClearChat}
              variant="outline" 
              size="sm" 
              className="flex-1 bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              New Chat
            </Button>
            <Button 
              onClick={() => setShowSidebar(false)}
              variant="ghost" 
              size="icon"
              className="lg:hidden"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="px-4 pt-4">
          <Tabs defaultValue="history" className="w-full" onValueChange={setSidebarView}>
            <TabsList className="grid grid-cols-1 mb-4 bg-gray-100/50 p-1">
              <TabsTrigger value="history" className="text-xs">Tips</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Sidebar Content */}
        <ScrollArea className="flex px-4 pb-4 h-2/3 lg:h-full overflow-y-auto">
          {sidebarView === "history" && (
            <>
              <div className="space-y-1">
                {chatHistory.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setShowSidebar(false)}
                    className="w-full text-left p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group border border-transparent hover:border-blue-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                          {chat.unread && (
                            <span className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-1">{chat.preview}</p>
                        <p className="text-xs text-gray-400">{chat.time}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </button>
                ))}
              </div>
              
             </>
          )}
        </ScrollArea>
        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50/50 to-white/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
              {student?.image ? (
                <AvatarImage src={student.image} alt={student.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs">
                  {getInitials(student?.name || "S")}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-gray-900">{student?.name || "Student"}</p>
              <p className="text-xs text-gray-500 truncate">{student?.course?.name || "Course"}</p>
            </div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-white">
              Student
            </Badge>
          </div>
        </div>
       </div>
      

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <Avatar className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg text-gray-900">ONIX Assistant</h1>
                  <Badge variant="secondary" className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    {isTyping ? "Typing..." : "Online"}
                  </span>
                  <span>•</span>
                  <span>Course: {student?.course?.name || "Not enrolled"}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => scrollToBottom()}
                title="Scroll to bottom"
                className="h-9 w-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              >
                <ChevronRight className="h-4 w-4 rotate-90" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClearChat}
                title="Clear chat"
                className="h-9 w-9 text-gray-500 hover:text-red-600 hover:bg-red-50 hidden sm:flex"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleClearChat}>
                    <RefreshCw className="h-4 w-4 mr-2 text-gray-500" />
                    Clear Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 lg:p-6 h-2/3 lg:h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 group animate-in fade-in duration-300",
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.sender === 'user' ? (
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                      {student?.image ? (
                        <AvatarImage 
                          src={student.image} 
                          alt={student.name}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs">
                          {getInitials(student?.name || "ME")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ) : (
                    <Avatar className="h-9 w-9 bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-700">
                        <Bot className="h-4 w-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={cn(
                  "flex-1 max-w-[85%] lg:max-w-[75%]",
                  message.sender === 'user' ? 'items-end' : ''
                )}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm",
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200/50'
                        : 'bg-white/90 border border-gray-200/50 shadow-gray-200/50'
                    )}
                  >
                    <div className={cn(
                      "prose prose-sm max-w-none",
                      message.sender === "user" ? "prose-invert" : ""
                    )}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2 mt-1" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-semibold mb-2 mt-1" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-semibold mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                          p: ({node, ...props}) => <p className="my-1.5 leading-relaxed" {...props} />,
                          code: ({node, ...props}) => <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm" {...props} />,
                          pre: ({node, ...props}) => <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto my-2" {...props} />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                    
                    {/* Message Footer */}
                    <div className={cn(
                      "flex items-center justify-between mt-3 pt-3",
                      message.sender === 'user' 
                        ? 'border-blue-400/30' 
                        : 'border-gray-100'
                    )}>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs",
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        )}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'user' && (
                          <span className="text-blue-100">
                            {renderStatusIcon(message.status, message.sender)}
                          </span>
                        )}
                      </div>
                      
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            size="icon"
                            variant="ghost"
                            className={cn(
                              "h-7 w-7 hover:scale-105 transition-transform",
                              message.feedback === 'like' 
                                ? 'text-green-600 bg-green-50' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            )}
                            onClick={() => handleFeedback(message.id, 'like')}
                            title="Helpful"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className={cn(
                              "h-7 w-7 hover:scale-105 transition-transform",
                              message.feedback === 'dislike' 
                                ? 'text-red-600 bg-red-50' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            )}
                            onClick={() => handleFeedback(message.id, 'dislike')}
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform"
                            onClick={() => handleCopyText(message.text)}
                            title="Copy message"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-in fade-in duration-300">
                <Avatar className="h-9 w-9 bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-700">
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/90 border border-gray-200/50 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="h-2 w-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">ONIX is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm p-4 lg:p-6">
          <div className="max-w-3xl mx-auto">
           

            {/* Input Form */}
            <div className="relative">
          
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={`Ask ONIX about ${student?.course?.name || "your course"}...`}
                  className="min-h-[60px] max-h-[120px] pr-24 resize-none border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500/20 bg-white shadow-sm rounded-2xl"
                  disabled={isLoading}
                  rows={1}
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    title="Emoji"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !input.trim()}
                    size="icon"
                    className={cn(
                      "h-9 w-9 shadow-md hover:shadow-lg transition-all",
                      input.trim() && !isLoading 
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
                        : "bg-gray-200 text-gray-400"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Help Text */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-3 text-xs text-gray-500">
              <p className="mb-2 sm:mb-0 text-center sm:text-left">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  ONIX can make mistakes. Verify important information.
                </span>
              </p>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline">Enter to send</span>
                <span className="hidden sm:inline">•</span>
                <span>Shift + Enter for new line</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}