import React, { useState, useRef, useEffect } from 'react';
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
  ChevronRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  Zap,
  Shield,
  Star,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Bookmark,
  Share2,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  Settings,
  History,
  Lightbulb,
  Target,
  TrendingUp,
  Scale
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  citations?: Citation[];
  confidence?: number;
  category?: string;
  aiScore?: number;
  helpful?: boolean | null;
  tags?: string[];
  followUpSuggestions?: string[];
}

interface Citation {
  docName: string;
  page: number;
  relevance: number;
  section?: string;
  excerpt?: string;
}

const predefinedQuestions = [
  {
    category: 'Contract Management',
    icon: FileText,
    color: 'text-primary',
    questions: [
      'What contracts are expiring in the next 30 days?',
      'Show me all maintenance contracts above ₹50 lakhs',
      'Which contracts have penalty clauses for delays?',
      'List all contracts requiring renewal approval',
      'Identify contracts with performance guarantees'
    ]
  },
  {
    category: 'Compliance & Legal',
    icon: Shield,
    color: 'text-secondary',
    questions: [
      'What are the safety compliance requirements for new employees?',
      'Show me documents related to environmental regulations',
      'List all mandatory training requirements',
      'Check compliance status for current contracts',
      'What are the legal obligations in tender documents?'
    ]
  },
  {
    category: 'Financial Analysis',
    icon: TrendingUp,
    color: 'text-accent',
    questions: [
      'What is the total value of active contracts?',
      'Show me tender documents with budget over ₹1 crore',
      'Which departments have the highest contract spending?',
      'Analyze cost trends in maintenance contracts',
      'Compare pricing across similar service contracts'
    ]
  },
  {
    category: 'Risk Assessment',
    icon: AlertCircle,
    color: 'text-destructive',
    questions: [
      'Identify high-risk contracts requiring immediate attention',
      'What are the penalty clauses in active contracts?',
      'Show documents with compliance violations',
      'List contracts with insurance requirements',
      'Analyze risk factors in upcoming renewals'
    ]
  }
];

const sampleMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    content: 'Welcome to KMRL Document Intelligence! I\'m your AI assistant powered by advanced language models and trained on government compliance standards. I can help you with:\n\n🔍 **Smart Document Search** - Find information across thousands of documents instantly\n📊 **Compliance Analysis** - Check regulatory compliance and identify risks\n💼 **Contract Intelligence** - Analyze terms, conditions, and obligations\n🔒 **Security & Privacy** - All queries are processed with bank-grade security\n\nHow can I assist you today?',
    timestamp: new Date(Date.now() - 300000),
    confidence: 100,
    category: 'Welcome',
    aiScore: 100,
    tags: ['introduction', 'capabilities'],
    followUpSuggestions: [
      'Show me expiring contracts',
      'Analyze compliance status',
      'Search safety documents'
    ]
  }
];

const aiCapabilities = [
  { name: 'Document Analysis', score: 97, description: 'Extract key insights from contracts and policies' },
  { name: 'Compliance Checking', score: 94, description: 'Verify regulatory compliance across documents' },
  { name: 'Risk Assessment', score: 92, description: 'Identify potential risks and mitigation strategies' },
  { name: 'Legal Insights', score: 89, description: 'Provide legal interpretations and recommendations' }
];

export function EnhancedAIQAndA() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('chat');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setSearchHistory(prev => [inputValue, ...prev.filter(h => h !== inputValue)].slice(0, 10));
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with advanced features
    setTimeout(() => {
      const response = getEnhancedAIResponse(inputValue);
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        citations: response.citations,
        confidence: response.confidence,
        category: response.category,
        aiScore: response.aiScore,
        tags: response.tags,
        followUpSuggestions: response.followUpSuggestions
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000 + Math.random() * 1000);
  };

  const getEnhancedAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('expiring') || lowerQuestion.includes('expire')) {
      return {
        content: `🔍 **Contract Expiry Analysis Complete**\n\n**Critical Contracts Expiring (Next 30 Days):**\n\n🚨 **High Priority:**\n• **Metro Rail Maintenance Contract** - Expires Sep 15, 2025 (6 days)\n  - Value: ₹2.4 crores | Department: Engineering\n  - Action Required: Immediate renewal initiation\n  - Risk Level: HIGH - Service disruption possible\n\n⚠️ **Medium Priority:**\n• **Station Security Services** - Expires Sep 20, 2025 (11 days)\n  - Value: ₹1.8 crores | Department: Security\n  - Auto-renewal clause: Available\n  - Performance score: 94/100\n\n📋 **Standard Priority:**\n• **Cleaning Services Contract** - Expires Sep 28, 2025 (19 days)\n  - Value: ₹85 lakhs | Department: Operations\n  - Renewal status: Under review\n\n**📊 Impact Analysis:**\n- Total contract value at risk: ₹4.95 crores\n- Service continuity risk: Medium to High\n- Recommended action timeline: Next 48 hours\n\n**🎯 Next Steps:**\n1. Schedule renewal meetings with legal team\n2. Review performance metrics for all contracts\n3. Prepare tender documents for critical contracts\n4. Initiate vendor negotiations within 24 hours`,
        citations: [
          { docName: 'Metro Rail Maintenance Contract', page: 1, relevance: 98, section: 'Contract Terms', excerpt: 'Contract expiry date: September 15, 2025' },
          { docName: 'Security Services Agreement', page: 3, relevance: 95, section: 'Renewal Clause', excerpt: 'Auto-renewal available with 30-day notice' },
          { docName: 'Cleaning Services Contract', page: 2, relevance: 87, section: 'Term & Conditions', excerpt: 'Contract term expires September 28, 2025' }
        ],
        confidence: 96,
        category: 'Contract Management',
        aiScore: 98,
        tags: ['contracts', 'expiry', 'urgent', 'renewals'],
        followUpSuggestions: [
          'Show performance metrics for expiring contracts',
          'Generate renewal notice templates',
          'Analyze contract penalty clauses'
        ]
      };
    }

    if (lowerQuestion.includes('safety') || lowerQuestion.includes('compliance')) {
      return {
        content: `🛡️ **Safety Compliance Analysis**\n\n**Current Compliance Status: ✅ 94% Compliant**\n\n**📋 Mandatory Safety Requirements:**\n\n**🎓 Training Requirements:**\n• Platform Safety Certification (Annual renewal)\n• Emergency Response Training (6-month cycle)\n• First Aid & CPR Certification (2-year validity)\n• Equipment Operation Certification\n• Safety Protocol Familiarization\n\n**🦺 Equipment Requirements:**\n• High-visibility safety vests (Bureau of Indian Standards certified)\n• Safety helmets with KMRL identification\n• Emergency communication devices\n• Personal protective equipment (PPE)\n• Fall protection gear for elevated work\n\n**⚠️ Compliance Gaps Identified:**\n1. **5 employees** pending safety recertification\n2. **2 departments** overdue for safety drill\n3. **Equipment inspection** due in 7 days\n\n**📊 Safety Metrics:**\n- Incident rate: 0.02% (Industry best: 0.01%)\n- Training completion: 94%\n- Equipment compliance: 97%\n- Emergency response time: 2.3 minutes\n\n**🎯 Recommended Actions:**\n• Schedule immediate recertification for pending employees\n• Conduct safety drills for Operations & Maintenance departments\n• Update emergency contact databases\n• Review and update safety protocols quarterly`,
        citations: [
          { docName: 'Employee Safety Guidelines v2.1', page: 1, relevance: 96, section: 'Training Requirements', excerpt: 'All employees must complete safety certification annually' },
          { docName: 'KMRL Safety Protocol Manual', page: 15, relevance: 92, section: 'Equipment Standards', excerpt: 'PPE must meet Bureau of Indian Standards specifications' },
          { docName: 'Emergency Response Procedures', page: 8, relevance: 89, section: 'Compliance Monitoring', excerpt: 'Monthly safety audits are mandatory' }
        ],
        confidence: 94,
        category: 'Safety & Compliance',
        aiScore: 96,
        tags: ['safety', 'compliance', 'training', 'regulations'],
        followUpSuggestions: [
          'Generate safety training schedule',
          'Show emergency response procedures',
          'List overdue safety certifications'
        ]
      };
    }

    if (lowerQuestion.includes('financial') || lowerQuestion.includes('budget') || lowerQuestion.includes('cost')) {
      return {
        content: `💰 **Financial Analysis Dashboard**\n\n**📊 Contract Portfolio Overview:**\n\n**Total Active Contracts Value: ₹847.6 crores**\n\n**💼 Department-wise Breakdown:**\n• **Engineering:** ₹324.2 crores (38.3%)\n• **Operations:** ₹187.4 crores (22.1%)\n• **Security:** ₹156.8 crores (18.5%)\n• **IT Systems:** ₹98.7 crores (11.6%)\n• **Administrative:** ₹80.5 crores (9.5%)\n\n**📈 High-Value Contracts (>₹1 crore):**\n1. **Metro Infrastructure Maintenance** - ₹245 crores\n2. **Integrated Security Systems** - ₹156 crores\n3. **Rolling Stock Maintenance** - ₹134 crores\n4. **Station Management Services** - ₹87 crores\n5. **IT Infrastructure & Support** - ₹76 crores\n\n**⚠️ Budget Alerts:**\n- **3 contracts** exceed original budget by >10%\n- **₹23.4 crores** pending payment approvals\n- **2 tenders** require budget revision\n\n**📋 Cost Optimization Opportunities:**\n• Renegotiate maintenance contracts (potential savings: ₹12 crores)\n• Consolidate security services (estimated savings: ₹8 crores)\n• Energy efficiency improvements (ROI: 24 months)\n\n**🎯 Financial Health Score: 87/100**\n- Budget adherence: 91%\n- Cost efficiency: 84%\n- Payment timeliness: 96%`,
        citations: [
          { docName: 'Annual Financial Summary 2025', page: 1, relevance: 99, section: 'Contract Values', excerpt: 'Total active contract portfolio valued at ₹847.6 crores' },
          { docName: 'Department Budget Allocation', page: 5, relevance: 94, section: 'Engineering Contracts', excerpt: 'Engineering department contracts: ₹324.2 crores' },
          { docName: 'Cost Analysis Report', page: 12, relevance: 91, section: 'Optimization', excerpt: 'Identified ₹20 crores in potential savings' }
        ],
        confidence: 97,
        category: 'Financial Analysis',
        aiScore: 95,
        tags: ['financial', 'budget', 'contracts', 'analysis'],
        followUpSuggestions: [
          'Show budget variance analysis',
          'Generate cost optimization report',
          'List pending payment approvals'
        ]
      };
    }

    return {
      content: `🤖 **AI Analysis Complete**\n\nI've processed your query and searched through the KMRL document database. Based on the context of your question, I can provide detailed insights about:\n\n• Document summaries and key findings\n• Compliance status and regulatory requirements\n• Financial implications and budget analysis\n• Risk assessment and mitigation strategies\n• Legal obligations and contractual terms\n\nWould you like me to focus on any specific aspect? I can also provide more detailed analysis with specific document references and actionable recommendations.\n\n**💡 Tip:** Try asking more specific questions about contracts, safety protocols, financial data, or compliance requirements for more targeted insights.`,
      citations: [
        { docName: 'KMRL Document Database', page: 1, relevance: 85, section: 'General Information', excerpt: 'Comprehensive document repository with AI-powered search capabilities' }
      ],
      confidence: 85,
      category: 'General Query',
      aiScore: 88,
      tags: ['general', 'assistance', 'search'],
      followUpSuggestions: [
        'Ask about specific contract types',
        'Request compliance analysis',
        'Inquire about financial reports'
      ]
    };
  };

  const handlePredefinedQuestion = (question: string) => {
    setInputValue(question);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  const handleFeedback = (messageId: number, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-primary" />
              <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1" />
            </div>
            AI Document Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Advanced AI assistant for government document analysis and compliance monitoring
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 bg-secondary/20 text-secondary">
            <Zap className="w-3 h-3" />
            GPT-4 Powered
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Government Grade Security
          </Badge>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.code} value={lang.name}>{lang.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* AI Capabilities Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiCapabilities.map((capability, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm">{capability.name}</h4>
                <Badge variant="secondary" className="text-xs">{capability.score}%</Badge>
              </div>
              <Progress value={capability.score} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">{capability.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="questions">Quick Questions</TabsTrigger>
          <TabsTrigger value="history">Chat History</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Quick Access Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predefinedQuestions.slice(0, 2).map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <div className="flex items-center gap-2 mb-2">
                        <category.icon className={`w-4 h-4 ${category.color}`} />
                        <h4 className="text-sm">{category.category}</h4>
                      </div>
                      <div className="space-y-2">
                        {category.questions.slice(0, 3).map((question, questionIndex) => (
                          <button
                            key={questionIndex}
                            onClick={() => handlePredefinedQuestion(question)}
                            className="w-full text-left text-xs p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors hover:shadow-sm"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm mb-2 flex items-center gap-2">
                      <History className="w-4 h-4 text-muted-foreground" />
                      Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {searchHistory.slice(0, 5).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(search)}
                          className="w-full text-left text-xs p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors truncate"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[700px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>AI Document Assistant</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  {/* Enhanced Messages Area */}
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div key={message.id} className="flex gap-4">
                          <Avatar className="w-10 h-10 mt-1">
                            <AvatarFallback className={
                              message.type === 'ai' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'
                            }>
                              {message.type === 'ai' ? <Brain className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-sm">
                                {message.type === 'ai' ? 'KMRL AI Assistant' : 'You'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {message.confidence}% confident
                                </Badge>
                              )}
                            </div>
                            
                            <div className={`rounded-xl p-4 ${
                              message.type === 'ai' 
                                ? 'bg-muted/50 border border-muted' 
                                : 'bg-primary text-primary-foreground'
                            }`}>
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {message.content}
                              </div>
                              
                              {message.type === 'ai' && (
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-muted">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => copyToClipboard(message.content)}
                                    className="h-8 px-3"
                                  >
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copy
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleFeedback(message.id, true)}
                                    className={`h-8 px-3 ${message.helpful === true ? 'text-secondary' : ''}`}
                                  >
                                    <ThumbsUp className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleFeedback(message.id, false)}
                                    className={`h-8 px-3 ${message.helpful === false ? 'text-destructive' : ''}`}
                                  >
                                    <ThumbsDown className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-3">
                                    <Bookmark className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-3">
                                    <Share2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            
                            {/* Enhanced Citations */}
                            {message.citations && message.citations.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  Sources & References:
                                </p>
                                <div className="grid gap-2">
                                  {message.citations.map((citation, index) => (
                                    <div 
                                      key={index}
                                      className="flex items-start gap-3 text-xs bg-accent/10 rounded-lg p-3 border border-accent/20"
                                    >
                                      <FileText className="w-4 h-4 text-accent mt-0.5" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-medium">{citation.docName}</span>
                                          <Badge variant="outline" className="text-xs h-4">
                                            Page {citation.page}
                                          </Badge>
                                          <Badge variant="secondary" className="text-xs h-4">
                                            {citation.relevance}% match
                                          </Badge>
                                        </div>
                                        {citation.section && (
                                          <div className="text-muted-foreground mb-1">
                                            Section: {citation.section}
                                          </div>
                                        )}
                                        {citation.excerpt && (
                                          <div className="text-muted-foreground italic">
                                            "{citation.excerpt}"
                                          </div>
                                        )}
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Follow-up Suggestions */}
                            {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Lightbulb className="w-3 h-3" />
                                  Suggested follow-up questions:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {message.followUpSuggestions.map((suggestion, index) => (
                                    <button
                                      key={index}
                                      onClick={() => handlePredefinedQuestion(suggestion)}
                                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                      {suggestion}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex gap-4">
                          <Avatar className="w-10 h-10 mt-1">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Brain className="w-5 h-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted/50 rounded-xl p-4 border border-muted">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  AI is analyzing documents and generating insights...
                                </span>
                              </div>
                              <div className="mt-2">
                                <Progress value={65} className="h-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Enhanced Input Area */}
                  <div className="border-t pt-4 mt-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Ask me anything about your documents, compliance, contracts, or policies..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="min-h-[80px] resize-none pr-12"
                        />
                        <div className="absolute right-2 bottom-2 flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleVoiceInput}
                            className={`h-8 w-8 p-0 ${isListening ? 'text-destructive' : 'text-muted-foreground'}`}
                          >
                            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="self-end px-6 py-6"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Press Enter to send • Shift+Enter for new line • Click mic for voice input</span>
                      <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        <span>Secure • Encrypted • Compliant</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predefinedQuestions.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className={`w-5 h-5 ${category.color}`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => {
                          handlePredefinedQuestion(question);
                          setActiveTab('chat');
                        }}
                        className="w-full text-left p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span>{question}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Chat History & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl text-primary">{messages.length - 1}</div>
                    <div className="text-sm text-muted-foreground">Total Queries</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl text-secondary">
                      {Math.round(messages.filter(m => m.confidence).reduce((acc, m) => acc + (m.confidence || 0), 0) / messages.filter(m => m.confidence).length) || 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Confidence</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl text-accent">
                      {messages.filter(m => m.helpful === true).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Helpful Responses</div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm mb-3">Recent Search History</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchHistory.map((search, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-sm">{search}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setInputValue(search);
                            setActiveTab('chat');
                          }}
                        >
                          <Search className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}