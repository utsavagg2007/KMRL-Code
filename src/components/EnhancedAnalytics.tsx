import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  FileText,
  Users,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  RefreshCw,
  Target,
  Activity,
  Zap,
  Shield,
  Brain,
  Eye,
  Settings,
  Share2,
  Star,
  Award,
  Lightbulb,
  Scale,
  Globe,
  LineChart,
  PieChart,
  BarChart,
  TrendingDown,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

const contractAnalyticsData = [
  { month: 'Jan', value: 125.6, contracts: 45, renewals: 8, newContracts: 5 },
  { month: 'Feb', value: 132.4, contracts: 47, renewals: 6, newContracts: 8 },
  { month: 'Mar', value: 145.2, contracts: 52, renewals: 12, newContracts: 7 },
  { month: 'Apr', value: 156.8, contracts: 55, renewals: 9, newContracts: 6 },
  { month: 'May', value: 178.9, contracts: 61, renewals: 15, newContracts: 11 },
  { month: 'Jun', value: 198.4, contracts: 67, renewals: 8, newContracts: 8 }
];

const departmentPerformanceData = [
  { 
    department: 'Engineering', 
    efficiency: 94, 
    compliance: 97, 
    onTime: 89, 
    budget: 87,
    contracts: 45,
    value: 125.6,
    riskScore: 23,
    trend: 'up'
  },
  { 
    department: 'Operations', 
    efficiency: 89, 
    compliance: 92, 
    onTime: 94, 
    budget: 91,
    contracts: 32,
    value: 87.2,
    riskScore: 18,
    trend: 'up'
  },
  { 
    department: 'Security', 
    efficiency: 92, 
    compliance: 95, 
    onTime: 87, 
    budget: 89,
    contracts: 24,
    value: 65.1,
    riskScore: 31,
    trend: 'down'
  },
  { 
    department: 'IT', 
    efficiency: 88, 
    compliance: 89, 
    onTime: 92, 
    budget: 85,
    contracts: 28,
    value: 78.4,
    riskScore: 42,
    trend: 'stable'
  },
  { 
    department: 'HR', 
    efficiency: 91, 
    compliance: 98, 
    onTime: 96, 
    budget: 94,
    contracts: 18,
    value: 42.3,
    riskScore: 12,
    trend: 'up'
  }
];

const riskAnalyticsData = [
  { category: 'Contract Expiry', high: 3, medium: 8, low: 12, trend: 'increasing' },
  { category: 'Compliance', high: 1, medium: 4, low: 15, trend: 'stable' },
  { category: 'Financial', high: 2, medium: 6, low: 8, trend: 'decreasing' },
  { category: 'Operational', high: 0, medium: 3, low: 18, trend: 'stable' },
  { category: 'Legal', high: 1, medium: 2, low: 12, trend: 'decreasing' }
];

const aiInsights = [
  {
    id: 1,
    type: 'prediction',
    title: 'Contract Renewal Prediction',
    description: 'AI predicts 3 high-value contracts may face renewal delays based on historical patterns',
    confidence: 94,
    priority: 'high',
    action: 'Start renewal process 2 weeks earlier',
    impact: 'Potential ₹12.5 Cr at risk'
  },
  {
    id: 2,
    type: 'optimization',
    title: 'Cost Optimization Opportunity',
    description: 'Machine learning identified ₹8.7 Cr potential savings through contract consolidation',
    confidence: 87,
    priority: 'medium',
    action: 'Review similar service contracts',
    impact: '15-20% cost reduction possible'
  },
  {
    id: 3,
    type: 'compliance',
    title: 'Compliance Pattern Analysis',
    description: 'Unusual delay pattern detected in Legal department document reviews',
    confidence: 91,
    priority: 'high',
    action: 'Investigate workflow bottlenecks',
    impact: 'Potential regulatory exposure'
  }
];

const performanceMetrics = {
  overallScore: 89,
  efficiency: 91,
  compliance: 94,
  costOptimization: 87,
  riskManagement: 92,
  documentProcessing: 86,
  automationLevel: 78
};

export function EnhancedAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-secondary" />;
      case 'down':
        return <ArrowDown className="w-3 h-3 text-destructive" />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <Brain className="w-4 h-4 text-primary" />;
      case 'optimization':
        return <Target className="w-4 h-4 text-secondary" />;
      case 'compliance':
        return <Shield className="w-4 h-4 text-accent" />;
      default:
        return <Lightbulb className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground flex items-center gap-3">
            <div className="relative">
              <BarChart3 className="w-8 h-8 text-primary" />
              <Activity className="w-4 h-4 text-secondary absolute -top-1 -right-1" />
            </div>
            Advanced Analytics Center
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights and comprehensive analytics for government contract management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 bg-secondary/20 text-secondary">
            <Brain className="w-3 h-3" />
            AI Analytics
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Real-time Data
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overall Score</p>
                <p className="text-2xl text-primary">{performanceMetrics.overallScore}%</p>
              </div>
              <Award className="w-6 h-6 text-primary" />
            </div>
            <Progress value={performanceMetrics.overallScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Efficiency</p>
                <p className="text-2xl text-secondary">{performanceMetrics.efficiency}%</p>
              </div>
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <Progress value={performanceMetrics.efficiency} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Compliance</p>
                <p className="text-2xl text-accent">{performanceMetrics.compliance}%</p>
              </div>
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <Progress value={performanceMetrics.compliance} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Cost Optimization</p>
                <p className="text-2xl">{performanceMetrics.costOptimization}%</p>
              </div>
              <Target className="w-6 h-6 text-muted-foreground" />
            </div>
            <Progress value={performanceMetrics.costOptimization} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Risk Management</p>
                <p className="text-2xl text-destructive">{performanceMetrics.riskManagement}%</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <Progress value={performanceMetrics.riskManagement} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Processing</p>
                <p className="text-2xl">{performanceMetrics.documentProcessing}%</p>
              </div>
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <Progress value={performanceMetrics.documentProcessing} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Automation</p>
                <p className="text-2xl">{performanceMetrics.automationLevel}%</p>
              </div>
              <Brain className="w-6 h-6 text-muted-foreground" />
            </div>
            <Progress value={performanceMetrics.automationLevel} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI-Powered Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 bg-background">
                <div className="flex items-start gap-3 mb-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{insight.title}</h4>
                    <Badge variant="outline" className="text-xs mt-1">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <Badge variant={insight.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Recommended Action:</span>
                    <p className="text-primary">{insight.action}</p>
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">Potential Impact:</span>
                    <p className="font-medium">{insight.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <TabsList className="grid grid-cols-5 w-full lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Enhanced Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contract Value Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Contract Value Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={contractAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary)/0.2)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Performance Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Department Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformanceData.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{dept.department}</h4>
                          {getTrendIcon(dept.trend)}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₹{dept.value} Cr</div>
                          <div className="text-xs text-muted-foreground">{dept.contracts} contracts</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Efficiency</span>
                            <span>{dept.efficiency}%</span>
                          </div>
                          <Progress value={dept.efficiency} className="h-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Compliance</span>
                            <span>{dept.compliance}%</span>
                          </div>
                          <Progress value={dept.compliance} className="h-1" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={dept.riskScore < 25 ? 'secondary' : dept.riskScore < 50 ? 'outline' : 'destructive'}
                          className="text-xs"
                        >
                          Risk: {dept.riskScore}%
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Contract Value</p>
                    <p className="text-2xl">₹487.6 Cr</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary">+12.5% from last quarter</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Contracts</p>
                    <p className="text-2xl">187</p>
                    <div className="flex items-center gap-1 mt-1">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">23 expiring soon</span>
                    </div>
                  </div>
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending Reviews</p>
                    <p className="text-2xl">42</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent">15 urgent</span>
                    </div>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risk Alerts</p>
                    <p className="text-2xl">7</p>
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-destructive" />
                      <span className="text-xs text-destructive">3 critical</span>
                    </div>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Portfolio Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={contractAnalyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="contracts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="renewals" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="newContracts" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Value Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      Engineering department holds 34% of total contract value with strong performance metrics.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    {departmentPerformanceData.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary" style={{
                            backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`
                          }} />
                          <span className="text-sm">{dept.department}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₹{dept.value} Cr</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((dept.value / 487.6) * 100)}% of total
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Department</th>
                      <th className="text-center p-3">Contracts</th>
                      <th className="text-center p-3">Value (₹ Cr)</th>
                      <th className="text-center p-3">Efficiency</th>
                      <th className="text-center p-3">Compliance</th>
                      <th className="text-center p-3">Risk Score</th>
                      <th className="text-center p-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentPerformanceData.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">{dept.department}</td>
                        <td className="p-3 text-center">{dept.contracts}</td>
                        <td className="p-3 text-center">₹{dept.value}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16">
                              <Progress value={dept.efficiency} className="h-2" />
                            </div>
                            <span className="text-sm">{dept.efficiency}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16">
                              <Progress value={dept.compliance} className="h-2" />
                            </div>
                            <span className="text-sm">{dept.compliance}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <Badge 
                            variant={dept.riskScore < 25 ? 'secondary' : dept.riskScore < 50 ? 'outline' : 'destructive'}
                          >
                            {dept.riskScore}%
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          {getTrendIcon(dept.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Risk Category Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskAnalyticsData.map((risk, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium">{risk.category}</h4>
                        <Badge variant={risk.trend === 'increasing' ? 'destructive' : 
                                      risk.trend === 'decreasing' ? 'secondary' : 'outline'}>
                          {risk.trend}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-destructive/10 rounded">
                          <div className="text-lg text-destructive">{risk.high}</div>
                          <div className="text-xs text-muted-foreground">High</div>
                        </div>
                        <div className="p-2 bg-accent/10 rounded">
                          <div className="text-lg text-accent">{risk.medium}</div>
                          <div className="text-xs text-muted-foreground">Medium</div>
                        </div>
                        <div className="p-2 bg-secondary/10 rounded">
                          <div className="text-lg text-secondary">{risk.low}</div>
                          <div className="text-xs text-muted-foreground">Low</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Priority:</strong> 3 contracts expiring within 7 days require immediate attention.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Target className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Medium Priority:</strong> IT department risk score increased by 15% this quarter.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Good News:</strong> Legal compliance risks decreased by 23% with new processes.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Trends & Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <Brain className="w-12 h-12 mx-auto mb-3" />
                <p className="mb-2">AI-powered trend analysis and forecasting</p>
                <p className="text-sm">Advanced machine learning models for contract and compliance predictions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}