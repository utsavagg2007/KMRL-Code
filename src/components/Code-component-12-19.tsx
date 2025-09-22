import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Send,
  Brain,
  FileText,
  Clock,
  CheckCircle,
  Bookmark,
  Share,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Search,
  MessageCircle,
  Sparkles,
  Database,
  Shield,
  TrendingUp,
  User,
  Bot
} from 'lucide-react';
import { toast } from 'sonner'';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
  confidence?: number;
  tokens?: number;
}

interface Source {
  documentId: string;
  documentName: string;
  page?: number;
  relevanceScore: number;
  excerpt: string;
}

interface QuickQuery {
  query: string;
  category: string;
  icon: React.ReactNode;
}

const quickQueries: QuickQuery[] = [
  {
    query: "What are the latest safety protocols for metro operations?",
    category: "Safety",
    icon: <Shield className="w-4 h-4" />
  },
  {
    query: "Show me financial performance metrics for Q4 2024",
    category: "Finance",
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    query: "What are the procurement guidelines for vendor selection?",
    category: "Procurement",
    icon: <FileText className="w-4 h-4" />
  },
  {
    query: "Explain the employee benefits policy changes",
    category: "HR",
    icon: <User className="w-4 h-4" />
  }
];

const mockSources: Source[] = [
  {
    documentId: 'TD-2025-001',
    documentName: 'Metro Line Extension Tender Documentation',
    page: 12,
    relevanceScore: 96.8,
    excerpt: 'Safety protocols must be strictly adhered to during all construction phases, including mandatory safety briefings every morning and the use of certified protective equipment.'
  },
  {
    documentId: 'HR-POL-2025-003',
    documentName: 'Employee Safety Guidelines v2.3',
    page: 5,
    relevanceScore: 94.2,
    excerpt: 'All employees must complete the updated safety training module within 30 days of implementation. Emergency procedures have been revised to include new evacuation routes.'
  }
];

export function WorldClassAIQAndA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your KMRL Document Intelligence Assistant. I can help you find information across all your documents, contracts, policies, and manuals. Ask me anything about your organizational knowledge base!',
      timestamp: new Date(),
      confidence: 100
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query: string = inputValue) => {
    if (!query.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(query),
        timestamp: new Date(),
        sources: mockSources,
        confidence: Math.floor(Math.random() * 10) + 90,
        tokens: Math.floor(Math.random() * 200) + 150
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const generateAIResponse = (query: string): string => {
    // Simulate contextual AI responses based on query content
    if (query.toLowerCase().includes('safety')) {
      return `Based on the latest safety documentation, KMRL has implemented comprehensive safety protocols including:

**Key Safety Measures:**
• Daily safety briefings for all operational staff
• Mandatory use of certified protective equipment
• Updated emergency evacuation procedures with new routes
• Regular safety audits and compliance checks

**Recent Updates:**
• New safety training modules must be completed within 30 days
• Enhanced fire safety systems installed across all stations
• Updated incident reporting procedures for faster response

The compliance score for safety protocols is currently at 98.7%, indicating excellent adherence to safety standards across all departments.`;
    }
    
    if (query.toLowerCase().includes('financial') || query.toLowerCase().includes('budget')) {
      return `The Q4 2024 financial performance shows strong operational efficiency:

**Financial Highlights:**
• Revenue increased by 12.3% compared to Q3 2024
• Operating costs reduced by 8.1% through optimization
• Passenger ridership grew by 15.7% year-over-year
• Infrastructure investment ROI improved to 14.2%

**Budget Allocation:**
• 45% Operations & Maintenance
• 30% Infrastructure Development
• 15% Technology & Innovation
• 10% Administrative & Overhead

The financial sustainability index has improved significantly, with projected break-even by Q2 2025.`;
    }

    return `I've analyzed your query across our document database. Here's what I found:

**Summary:**
Your question touches on important organizational policies and procedures. Based on the documents in our system, I can provide detailed insights with high confidence.

**Key Points:**
• All relevant policies are up-to-date and compliant with government regulations
• Recent updates have been implemented across all departments
• Automated compliance monitoring is active and reporting green status

**Next Steps:**
Would you like me to dive deeper into any specific aspect of this topic? I can provide more detailed analysis or help you locate specific documents.`;
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Response copied to clipboard');
  };

  const stats = {
    totalQueries: 1249,
    avgResponseTime: 2.3,
    avgConfidence: 96.4,
    documentsSearched: 47562
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Q&A Intelligence Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Ask questions about your documents and get instant, intelligent answers
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
            <Brain className="w-3 h-3 mr-1" />
            AI Assistant Active
          </Badge>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Queries</p>
                <p className="text-2xl font-bold text-primary">{stats.totalQueries.toLocaleString()}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-secondary">{stats.avgResponseTime}s</p>
              </div>
              <Zap className="w-8 h-8 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-accent">{stats.avgConfidence}%</p>
              </div>
              <Sparkles className="w-8 h-8 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents Indexed</p>
                <p className="text-2xl font-bold text-green-600">{stats.documentsSearched.toLocaleString()}</p>
              </div>
              <Database className="w-8 h-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Queries Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <span>Quick Queries</span>
              </CardTitle>
              <CardDescription>Popular questions to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                  onClick={() => handleQuickQuery(query.query)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{query.icon}</div>
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs mb-1">
                        {query.category}
                      </Badge>
                      <p className="text-sm">{query.query}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Multi-document search</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Contextual understanding</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Source citations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Compliance checking</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-secondary" />
                <span>Policy analysis</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="shadow-lg h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <span>AI Document Assistant</span>
              </CardTitle>
              <CardDescription>
                Ask questions about your documents and get intelligent, cited responses
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'ai' && (
                            <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          )}
                          {message.type === 'user' && (
                            <User className="w-5 h-5 text-primary-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 space-y-2">
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            
                            {/* Sources */}
                            {message.sources && message.sources.length > 0 && (
                              <div className="border-t pt-3 mt-3 space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Sources:</p>
                                {message.sources.map((source, index) => (
                                  <div key={index} className="bg-background rounded p-3 border">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        <span className="font-medium text-sm">{source.documentName}</span>
                                      </div>
                                      <Badge variant="secondary" className="text-xs">
                                        {source.relevanceScore}% match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground italic">
                                      "{source.excerpt}"
                                    </p>
                                    {source.page && (
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Page {source.page}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* AI Message Metadata */}
                            {message.type === 'ai' && (
                              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{message.timestamp.toLocaleTimeString()}</span>
                                  </div>
                                  {message.confidence && (
                                    <div className="flex items-center space-x-1">
                                      <Sparkles className="w-3 h-3" />
                                      <span>{message.confidence}% confidence</span>
                                    </div>
                                  )}
                                  {message.tokens && (
                                    <div className="flex items-center space-x-1">
                                      <Zap className="w-3 h-3" />
                                      <span>{message.tokens} tokens</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={() => copyToClipboard(message.content)}
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Processing Indicator */}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Brain className="w-5 h-5 text-primary animate-pulse" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground">AI is analyzing your query...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your documents..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isProcessing}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isProcessing}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  AI can make mistakes. Verify important information with original documents.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}