import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  Bot,
  Star,
  Download,
  RefreshCw,
  Lightbulb,
  Target,
  Activity,
  Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: Source[];
  confidence?: number;
  tokens?: number;
  category?: string;
  helpful?: boolean | null;
}

interface Source {
  documentId: string;
  documentName: string;
  page?: number;
  relevanceScore: number;
  excerpt: string;
  department: string;
  lastModified: string;
}

interface QuickQuery {
  query: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const quickQueries: QuickQuery[] = [
  {
    query: "What are the latest safety protocols for metro operations?",
    category: "Safety & Compliance",
    icon: <Shield className="w-4 h-4" />,
    color: "text-green-600"
  },
  {
    query: "Show me Q4 2024 financial performance metrics and analysis",
    category: "Financial Reports",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-blue-600"
  },
  {
    query: "What are the procurement guidelines for vendor selection?",
    category: "Procurement",
    icon: <FileText className="w-4 h-4" />,
    color: "text-purple-600"
  },
  {
    query: "Explain the updated employee benefits policy changes",
    category: "Human Resources",
    icon: <User className="w-4 h-4" />,
    color: "text-orange-600"
  },
  {
    query: "How do I access technical manuals for signal systems?",
    category: "Technical Support",
    icon: <Database className="w-4 h-4" />,
    color: "text-indigo-600"
  },
  {
    query: "What are the compliance requirements for new contracts?",
    category: "Legal & Compliance",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-emerald-600"
  }
];

const mockSources: Source[] = [
  {
    documentId: 'TD-2025-001',
    documentName: 'Metro Line Extension Tender Documentation Package',
    page: 12,
    relevanceScore: 96.8,
    excerpt: 'Safety protocols must be strictly adhered to during all construction phases, including mandatory safety briefings every morning and the use of certified protective equipment as per IS 14489:2018 standards.',
    department: 'Infrastructure Development',
    lastModified: '2025-01-10'
  },
  {
    documentId: 'HR-POL-2025-003',
    documentName: 'Employee Safety Guidelines & Protocols v2.3',
    page: 5,
    relevanceScore: 94.2,
    excerpt: 'All employees must complete the updated safety training module within 30 days of implementation. Emergency procedures have been revised to include new evacuation routes and assembly points.',
    department: 'Human Resources',
    lastModified: '2025-01-08'
  },
  {
    documentId: 'CX-891-2025',
    documentName: 'Station Maintenance Service Contract Agreement',
    page: 18,
    relevanceScore: 91.5,
    excerpt: 'Maintenance protocols shall follow the guidelines established in the Operations Manual v4.2, with specific emphasis on preventive maintenance schedules and emergency response procedures.',
    department: 'Operations & Maintenance',
    lastModified: '2025-01-09'
  }
];

export function PerfectAIQAndA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Welcome to the KMRL Document Intelligence Assistant! 🚇

I'm your AI-powered assistant designed to help you navigate through KMRL's vast document repository. I can help you with:

• **Document Search & Analysis** - Find specific information across contracts, policies, and manuals
• **Compliance Guidance** - Get answers about regulatory requirements and procedures  
• **Policy Interpretation** - Understand complex policy documents and their implications
• **Technical Support** - Access technical documentation and operational guidelines
• **Financial Insights** - Retrieve financial data and performance metrics

Feel free to ask me anything about KMRL's documents and policies. I'll provide accurate, cited responses with confidence scores and relevant source materials.

How can I assist you today?`,
      timestamp: new Date(),
      confidence: 100,
      category: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
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
      timestamp: new Date(),
      category: 'user_query'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate realistic AI processing with variable delay
    const processingTime = Math.random() * 2000 + 1500;
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateIntelligentResponse(query),
        timestamp: new Date(),
        sources: getRelevantSources(query),
        confidence: Math.floor(Math.random() * 8) + 92,
        tokens: Math.floor(Math.random() * 300) + 200,
        category: categorizeQuery(query)
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, processingTime);
  };

  const categorizeQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('safety') || lowerQuery.includes('security')) return 'safety';
    if (lowerQuery.includes('financial') || lowerQuery.includes('budget') || lowerQuery.includes('cost')) return 'financial';
    if (lowerQuery.includes('hr') || lowerQuery.includes('employee') || lowerQuery.includes('policy')) return 'hr';
    if (lowerQuery.includes('technical') || lowerQuery.includes('manual') || lowerQuery.includes('system')) return 'technical';
    if (lowerQuery.includes('contract') || lowerQuery.includes('tender') || lowerQuery.includes('procurement')) return 'procurement';
    return 'general';
  };

  const getRelevantSources = (query: string): Source[] => {
    // Return relevant sources based on query
    const category = categorizeQuery(query);
    const numSources = Math.floor(Math.random() * 3) + 1;
    return mockSources.slice(0, numSources);
  };

  const generateIntelligentResponse = (query: string): string => {
    const category = categorizeQuery(query);
    
    const responses = {
      safety: `Based on the latest safety documentation and protocols, here's a comprehensive overview:

**Current Safety Framework:**
• **Mandatory Safety Training**: All personnel must complete updated safety modules within 30 days
• **Daily Safety Protocols**: Morning safety briefings are mandatory for all operational staff
• **Emergency Procedures**: Updated evacuation routes and assembly points as per revised guidelines
• **Personal Protective Equipment**: Certified PPE as per IS 14489:2018 standards is mandatory

**Recent Updates (January 2025):**
• Enhanced fire safety systems installed across all stations
• New incident reporting procedures for faster emergency response
• Integration with city-wide emergency response network
• Updated safety audit schedules with quarterly assessments

**Compliance Status:**
• Current safety compliance score: 98.7%
• Zero safety incidents reported in the last 90 days
• All safety certifications are up-to-date and valid

The safety protocols are continuously monitored by our AI system and updated based on best practices and regulatory changes.`,

      financial: `Here's a comprehensive analysis of KMRL's Q4 2024 financial performance:

**Key Financial Highlights:**
• **Revenue Growth**: 12.3% increase compared to Q3 2024
• **Operational Efficiency**: 8.1% reduction in operating costs through optimization
• **Ridership Impact**: 15.7% year-over-year growth in passenger numbers
• **Infrastructure ROI**: Improved to 14.2% from previous quarter

**Budget Allocation Breakdown:**
• **Operations & Maintenance**: 45% (₹892 Crores)
• **Infrastructure Development**: 30% (₹595 Crores)  
• **Technology & Innovation**: 15% (₹297 Crores)
• **Administrative & Overhead**: 10% (₹198 Crores)

**Financial Sustainability Metrics:**
• Break-even projection: Q2 2025
• Debt-to-equity ratio: Improved to 1.2:1
• Operating margin: 23.4% (industry-leading)
• Cash flow positive for 6 consecutive quarters

**Future Projections:**
• Expected 18% revenue growth in 2025
• Phase 2 expansion funding secured
• Green bonds initiative for sustainable financing`,

      technical: `Here's the technical information and system documentation overview:

**Signal System Technical Framework:**
• **Current Version**: Advanced Signal System v4.2
• **Communication Protocol**: CBTC (Communications-Based Train Control)
• **Safety Integrity Level**: SIL 4 (highest safety standard)
• **System Availability**: 99.97% uptime guaranteed

**Technical Documentation Access:**
• **Signal System Manual**: 450+ pages of comprehensive technical specifications
• **Maintenance Procedures**: Detailed preventive and corrective maintenance protocols
• **Emergency Procedures**: Step-by-step crisis management protocols
• **System Integration**: Guidelines for third-party system integration

**Recent Technical Updates:**
• Upgraded to latest ETCS (European Train Control System) standards
• Integration with smart city infrastructure
• Enhanced cybersecurity protocols
• Predictive maintenance AI algorithms implemented

**Support Resources:**
• 24/7 technical helpdesk available
• Remote diagnostic capabilities
• Regular training programs for technical staff
• Vendor support agreements active`,

      hr: `Here's a comprehensive overview of KMRL's HR policies and employee benefits:

**Updated Employee Benefits (2025):**
• **Health Insurance**: Enhanced coverage including family members
• **Professional Development**: ₹50,000 annual learning budget per employee
• **Flexible Working**: Hybrid work options for eligible positions
• **Transportation**: Free metro passes for all employees and dependents

**Recent Policy Changes:**
• **Leave Policy**: Increased annual leave from 21 to 24 days
• **Maternity/Paternity**: Extended to 26 weeks for maternity, 15 days for paternity
• **Performance Bonuses**: Merit-based incentives up to 20% of annual salary
• **Wellness Programs**: On-site fitness facilities and mental health support

**Training & Development:**
• Mandatory safety training: 40 hours annually
• Leadership development programs
• Technical certification support
• Cross-departmental rotation opportunities

**Employee Support Services:**
• Employee Assistance Program (EAP)
• Career counseling and guidance
• Grievance redressal mechanism
• Recognition and rewards program

All policies are compliant with latest labor laws and government regulations.`,

      procurement: `Here's the comprehensive procurement framework and vendor selection guidelines:

**Procurement Process Overview:**
• **Tender Publication**: Minimum 21 days notice period
• **Vendor Registration**: Online portal with document verification
• **Technical Evaluation**: Multi-stage assessment process
• **Financial Evaluation**: L1/L2 methodology with quality parameters

**Vendor Selection Criteria:**
• **Technical Capability**: 40% weightage
• **Financial Stability**: 25% weightage  
• **Past Performance**: 20% weightage
• **Compliance & Certifications**: 15% weightage

**Key Requirements:**
• ISO 9001:2015 certification mandatory
• Minimum 5 years experience in similar projects
• Local content requirements as per government policy
• Environmental and safety compliance certificates

**Digital Procurement Platform:**
• End-to-end online process
• Real-time tracking and updates
• Automated compliance checking
• Transparent evaluation methodology

**Recent Updates:**
• Enhanced due diligence procedures
• Sustainability criteria integration
• Performance-based contracting options
• Vendor development programs for MSMEs

All procurement activities are monitored for transparency and compliance with government regulations.`,

      general: `Thank you for your query. I've searched through KMRL's comprehensive document repository to provide you with accurate information.

**Search Results Summary:**
• Analyzed 47,562 documents across all departments
• Cross-referenced multiple policy documents and procedures
• Verified information against latest regulatory updates
• Confidence level: High (based on official documentation)

**Key Information Sources:**
• Official policy documents and procedures
• Government regulations and guidelines
• Industry best practices and standards
• Recent updates and amendments

**Additional Support:**
• For specific technical details, please refer to department-specific manuals
• For policy clarifications, contact the relevant department directly
• For urgent matters, use the emergency contact procedures
• For suggestions or feedback, use the internal portal

Would you like me to search for more specific information or clarify any particular aspect of your query?`
    };

    return responses[category as keyof typeof responses] || responses.general;
  };

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Response copied to clipboard');
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
    toast.success(`Thank you for your feedback!`);
  };

  const stats = {
    totalQueries: 2847,
    avgResponseTime: 2.1,
    avgConfidence: 96.4,
    documentsSearched: 47562,
    successRate: 98.7,
    activeUsers: 143
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="p-6 space-y-6">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-primary-foreground shadow-2xl border border-primary/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Q&A Intelligence Center</h1>
                  <p className="text-primary-foreground/90 text-sm">
                    Advanced document intelligence and knowledge assistance
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-500/10 text-green-100 border-green-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Assistant Online
              </Badge>
              <div className="text-right text-sm text-primary-foreground/80">
                <div>Response Time: {stats.avgResponseTime}s</div>
                <div>Success Rate: {stats.successRate}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Queries</p>
                  <p className="text-2xl font-bold text-primary">{formatNumber(stats.totalQueries)}</p>
                  <p className="text-xs text-green-600 mt-1">+127 today</p>
                </div>
                <MessageCircle className="w-8 h-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-secondary">{stats.avgResponseTime}s</p>
                  <p className="text-xs text-green-600 mt-1">-0.3s improved</p>
                </div>
                <Zap className="w-8 h-8 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-accent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Confidence</p>
                  <p className="text-2xl font-bold text-accent">{stats.avgConfidence}%</p>
                  <p className="text-xs text-green-600 mt-1">Excellent</p>
                </div>
                <Sparkles className="w-8 h-8 text-accent/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Documents Indexed</p>
                  <p className="text-2xl font-bold text-green-600">{formatNumber(stats.documentsSearched)}</p>
                  <p className="text-xs text-green-600 mt-1">Complete coverage</p>
                </div>
                <Database className="w-8 h-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
                  <p className="text-xs text-green-600 mt-1">Outstanding</p>
                </div>
                <Target className="w-8 h-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.activeUsers}</p>
                  <p className="text-xs text-green-600 mt-1">+12 today</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Queries Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span>Quick Queries</span>
                </CardTitle>
                <CardDescription>Popular questions to get you started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => handleQuickQuery(query.query)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 mt-0.5 ${query.color}`}>
                        {query.icon}
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <Badge variant="outline" className="text-xs mb-1">
                          {query.category}
                        </Badge>
                        <p className="text-sm leading-relaxed">{query.query}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-secondary" />
                  <span>AI Capabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Multi-document search & analysis</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Contextual understanding</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Source citations & references</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Compliance verification</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Policy interpretation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Real-time data access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-accent" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिंदी</SelectItem>
                      <SelectItem value="ml">മലയാളം</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Response Style</label>
                  <Select defaultValue="detailed">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brief">Brief & Concise</SelectItem>
                      <SelectItem value="detailed">Detailed & Comprehensive</SelectItem>
                      <SelectItem value="technical">Technical & Precise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg h-[700px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-primary" />
                      <span>KMRL AI Assistant</span>
                    </CardTitle>
                    <CardDescription>
                      Ask questions about documents, policies, and procedures
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Session
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl p-4 ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/50 border border-muted'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {message.type === 'ai' && (
                              <div className="flex-shrink-0 p-1 bg-primary/10 rounded-full mt-1">
                                <Brain className="w-4 h-4 text-primary" />
                              </div>
                            )}
                            {message.type === 'user' && (
                              <div className="flex-shrink-0 p-1 bg-primary-foreground/20 rounded-full mt-1">
                                <User className="w-4 h-4 text-primary-foreground" />
                              </div>
                            )}
                            <div className="flex-1 space-y-3">
                              <div className="whitespace-pre-wrap leading-relaxed">
                                {message.content}
                              </div>
                              
                              {/* Sources for AI messages */}
                              {message.sources && message.sources.length > 0 && (
                                <div className="border-t pt-3 mt-4 space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-medium text-primary">
                                      Source Documents ({message.sources.length})
                                    </p>
                                  </div>
                                  {message.sources.map((source, index) => (
                                    <div key={index} className="bg-background rounded-lg p-3 border border-muted/50">
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="outline" className="text-xs">
                                            {source.department}
                                          </Badge>
                                          <span className="font-medium text-sm">{source.documentName}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                            {source.relevanceScore}% match
                                          </Badge>
                                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                            <Eye className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                                        "{source.excerpt}"
                                      </p>
                                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                        <span>Document ID: {source.documentId}</span>
                                        {source.page && <span>Page {source.page}</span>}
                                        <span>Modified: {source.lastModified}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* AI Message Metadata */}
                              {message.type === 'ai' && message.category !== 'greeting' && (
                                <div className="border-t pt-3 space-y-2">
                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 px-2 text-xs"
                                        onClick={() => copyToClipboard(message.content)}
                                      >
                                        <Copy className="w-3 h-3 mr-1" />
                                        Copy
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 px-2 text-xs"
                                      >
                                        <Share className="w-3 h-3 mr-1" />
                                        Share
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 px-2 text-xs"
                                      >
                                        <Bookmark className="w-3 h-3 mr-1" />
                                        Save
                                      </Button>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <span className="text-xs text-muted-foreground mr-2">Helpful?</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className={`h-6 w-6 p-0 ${message.helpful === true ? 'bg-green-100 text-green-600' : ''}`}
                                        onClick={() => handleFeedback(message.id, true)}
                                      >
                                        <ThumbsUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className={`h-6 w-6 p-0 ${message.helpful === false ? 'bg-red-100 text-red-600' : ''}`}
                                        onClick={() => handleFeedback(message.id, false)}
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                      </Button>
                                    </div>
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
                        <div className="bg-muted/50 border border-muted rounded-xl p-4 max-w-[85%]">
                          <div className="flex items-center space-x-3">
                            <div className="p-1 bg-primary/10 rounded-full">
                              <Brain className="w-4 h-4 text-primary animate-pulse" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                              <span className="text-sm text-muted-foreground">AI is analyzing your query...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4 bg-muted/20">
                  <div className="flex space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Ask me anything about KMRL documents, policies, or procedures..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        disabled={isProcessing}
                        className="pr-12 min-h-[44px] resize-none"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        disabled={isProcessing}
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isProcessing}
                      className="h-[44px] px-6 bg-primary hover:bg-primary/90"
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    AI responses are generated based on official KMRL documents. Verify critical information with relevant departments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Status Footer */}
        <Card className="shadow-lg border-l-4 border-l-secondary bg-gradient-to-r from-secondary/5 via-background to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Brain className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">AI Knowledge Engine Status</p>
                  <p className="text-sm text-muted-foreground">
                    Documents indexed: {formatNumber(stats.documentsSearched)} • Knowledge base updated: 2 hours ago • Processing: Real-time
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  ONLINE
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {stats.successRate}% Success Rate
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}