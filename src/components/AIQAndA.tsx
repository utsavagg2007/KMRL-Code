import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  Download, 
  Globe, 
  Sparkles,
  FileText,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  citations?: Citation[];
}

interface Citation {
  docName: string;
  page: number;
  relevance: number;
}

const predefinedQuestions = [
  {
    category: 'Contract Management',
    questions: [
      'What contracts are expiring in the next 30 days?',
      'Show me all maintenance contracts above ₹50 lakhs',
      'Which contracts have penalty clauses for delays?',
    ]
  },
  {
    category: 'Compliance',
    questions: [
      'What are the safety compliance requirements for new employees?',
      'Show me documents related to environmental regulations',
      'List all mandatory training requirements',
    ]
  },
  {
    category: 'Financial',
    questions: [
      'What is the total value of active contracts?',
      'Show me tender documents with budget over ₹1 crore',
      'Which departments have the highest contract spending?',
    ]
  }
];

const sampleMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I\'m the KMRL Document Intelligence Assistant. I can help you search, analyze, and extract insights from your documents. Ask me anything about contracts, tenders, policies, or manuals.',
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: 2,
    type: 'user',
    content: 'What contracts are expiring in the next 30 days?',
    timestamp: new Date(Date.now() - 180000),
  },
  {
    id: 3,
    type: 'ai',
    content: 'Based on my analysis of your contract database, here are the contracts expiring within 30 days:\n\n**Critical Expiring Contracts:**\n\n1. **Metro Rail Maintenance Contract** - Expires Sep 15, 2025 (6 days remaining)\n   - Value: ₹2.4 crores\n   - Renewal notice required: Immediate action needed\n\n2. **Station Cleaning Services** - Expires Sep 20, 2025 (11 days remaining)\n   - Value: ₹85 lakhs\n   - Auto-renewal clause available\n\n3. **Security Services Contract** - Expires Sep 28, 2025 (19 days remaining)\n   - Value: ₹1.8 crores\n   - Performance review pending\n\n**Recommended Actions:**\n- Initiate renewal process for maintenance contract immediately\n- Review performance metrics before renewal decisions\n- Prepare tender documents for contracts without auto-renewal',
    timestamp: new Date(Date.now() - 120000),
    citations: [
      { docName: 'Metro Rail Maintenance Contract', page: 1, relevance: 95 },
      { docName: 'Station Cleaning Services Agreement', page: 3, relevance: 88 },
      { docName: 'Security Services Contract', page: 2, relevance: 92 }
    ]
  }
];

export function AIQAndA() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        citations: [
          { docName: 'Employee Safety Guidelines v2.1', page: 1, relevance: 94 },
          { docName: 'KMRL Safety Protocol Manual', page: 15, relevance: 87 }
        ]
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const getAIResponse = (question: string): string => {
    // Simple response generator based on keywords
    if (question.toLowerCase().includes('safety')) {
      return 'Based on the latest safety documents, here are the key safety requirements:\n\n**Mandatory Safety Training:**\n- Platform safety certification (renewed annually)\n- Emergency evacuation procedures\n- First aid and CPR certification\n\n**Safety Equipment Requirements:**\n- High-visibility safety vests for all platform staff\n- Safety helmets in designated areas\n- Emergency communication devices\n\n**Compliance Standards:**\n- Monthly safety drills mandatory\n- Incident reporting within 24 hours\n- Regular safety equipment inspections';
    }
    
    return 'I can help you with that! Based on the documents in your system, here\'s what I found. Would you like me to search for more specific information or provide additional details on any particular aspect?';
  };

  const handlePredefinedQuestion = (question: string) => {
    setInputValue(question);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Q&A Assistant
          </h1>
          <p className="text-muted-foreground">
            Ask questions about your documents and get intelligent insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bot className="w-3 h-3" />
            AI Powered
          </Badge>
          <Badge variant="outline">Multi-language Support</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Predefined Questions Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predefinedQuestions.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h4 className="text-sm mb-2">{category.category}</h4>
                  <div className="space-y-2">
                    {category.questions.map((question, questionIndex) => (
                      <button
                        key={questionIndex}
                        onClick={() => handlePredefinedQuestion(question)}
                        className="w-full text-left text-sm p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Document Intelligence Chat</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Translate
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className={
                          message.type === 'ai' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }>
                          {message.type === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {message.type === 'ai' ? 'AI Assistant' : 'You'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className={`rounded-lg p-3 ${
                          message.type === 'ai' 
                            ? 'bg-muted/50' 
                            : 'bg-primary text-primary-foreground'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">
                            {message.content}
                          </div>
                          
                          {message.type === 'ai' && (
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(message.content)}
                                className="h-7 px-2"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Citations */}
                        {message.citations && message.citations.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Sources:</p>
                            {message.citations.map((citation, index) => (
                              <div 
                                key={index}
                                className="flex items-center gap-2 text-xs bg-accent/50 rounded px-2 py-1"
                              >
                                <FileText className="w-3 h-3" />
                                <span>{citation.docName}</span>
                                <span className="text-muted-foreground">
                                  Page {citation.page}
                                </span>
                                <Badge variant="outline" className="text-xs h-4">
                                  {citation.relevance}% match
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <span className="text-sm text-muted-foreground ml-2">AI is analyzing...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="border-t pt-4 mt-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask me anything about your documents..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="min-h-[60px] resize-none"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}