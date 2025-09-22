import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  FileText,
  Brain,
  Users,
  Clock,
  Calendar,
  Download,
  Filter,
  Zap,
  Database,
  Shield,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface AnalyticsData {
  documentProcessing: Array<{
    month: string;
    processed: number;
    analyzed: number;
    queries: number;
    compliance: number;
  }>;
  departmentUsage: Array<{
    department: string;
    documents: number;
    queries: number;
    users: number;
  }>;
  aiPerformance: Array<{
    category: string;
    accuracy: number;
    speed: number;
    confidence: number;
  }>;
  complianceMetrics: Array<{
    category: string;
    current: number;
    target: number;
    trend: number;
  }>;
  userEngagement: Array<{
    week: string;
    activeUsers: number;
    documentsAccessed: number;
    aiQueriesRun: number;
  }>;
}

const analyticsData: AnalyticsData = {
  documentProcessing: [
    { month: 'Jan', processed: 3245, analyzed: 3098, queries: 892, compliance: 98.2 },
    { month: 'Feb', processed: 3876, analyzed: 3701, queries: 1034, compliance: 98.5 },
    { month: 'Mar', processed: 4123, analyzed: 3945, queries: 1187, compliance: 98.8 },
    { month: 'Apr', processed: 4567, analyzed: 4398, queries: 1342, compliance: 99.1 },
    { month: 'May', processed: 4891, analyzed: 4712, queries: 1456, compliance: 99.0 },
    { month: 'Jun', processed: 5234, analyzed: 5089, queries: 1587, compliance: 99.2 }
  ],
  departmentUsage: [
    { department: 'Infrastructure', documents: 15420, queries: 4231, users: 34 },
    { department: 'Operations', documents: 12876, queries: 3876, users: 28 },
    { department: 'Finance', documents: 8934, queries: 2145, users: 19 },
    { department: 'Human Resources', documents: 6789, queries: 1876, users: 15 },
    { department: 'Legal', documents: 3543, queries: 1234, users: 12 }
  ],
  aiPerformance: [
    { category: 'Document Classification', accuracy: 98.7, speed: 95.2, confidence: 97.1 },
    { category: 'Content Extraction', accuracy: 97.4, speed: 93.8, confidence: 96.3 },
    { category: 'Compliance Checking', accuracy: 99.1, speed: 92.6, confidence: 98.5 },
    { category: 'Query Processing', accuracy: 96.8, speed: 98.4, confidence: 95.7 },
    { category: 'Risk Assessment', accuracy: 95.9, speed: 89.3, confidence: 94.2 }
  ],
  complianceMetrics: [
    { category: 'Contract Compliance', current: 98.7, target: 99.0, trend: 0.3 },
    { category: 'Safety Protocols', current: 99.2, target: 99.5, trend: 0.1 },
    { category: 'Financial Documentation', current: 97.8, target: 98.5, trend: -0.2 },
    { category: 'HR Policies', current: 96.5, target: 98.0, trend: 1.2 },
    { category: 'Technical Standards', current: 99.1, target: 99.0, trend: 0.5 }
  ],
  userEngagement: [
    { week: 'Week 1', activeUsers: 128, documentsAccessed: 2847, aiQueriesRun: 456 },
    { week: 'Week 2', activeUsers: 134, documentsAccessed: 3102, aiQueriesRun: 523 },
    { week: 'Week 3', activeUsers: 142, documentsAccessed: 3456, aiQueriesRun: 612 },
    { week: 'Week 4', activeUsers: 151, documentsAccessed: 3789, aiQueriesRun: 698 }
  ]
};

const kpiSummary = {
  totalDocuments: 47562,
  aiProcessingRate: 96.3,
  avgComplianceScore: 98.4,
  activeUsers: 151,
  monthlyGrowth: 15.7,
  avgQueryTime: 2.3,
  systemUptime: 99.97,
  costSavings: 2.4
};

export function WorldClassAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const COLORS = ['#0B3D91', '#0F9D58', '#FF9933', '#6f42c1', '#20c997', '#fd7e14', '#e83e8c'];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Advanced Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into document intelligence and system performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-primary">{kpiSummary.totalDocuments.toLocaleString()}</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">+{kpiSummary.monthlyGrowth}%</span>
                </div>
              </div>
              <Database className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Processing Rate</p>
                <p className="text-2xl font-bold text-secondary">{kpiSummary.aiProcessingRate}%</p>
                <Progress value={kpiSummary.aiProcessingRate} className="mt-2 h-1" />
              </div>
              <Brain className="w-8 h-8 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold text-accent">{kpiSummary.avgComplianceScore}%</p>
                <div className="flex items-center text-xs mt-1">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">Excellent</span>
                </div>
              </div>
              <Shield className="w-8 h-8 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                <p className="text-2xl font-bold text-green-600">₹{kpiSummary.costSavings}M</p>
                <div className="flex items-center text-xs mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-500">Monthly</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Processing Trends */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Document Processing Trends</span>
                </CardTitle>
                <CardDescription>Monthly processing and analysis statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.documentProcessing}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="processed"
                      stackId="1"
                      stroke="#0B3D91"
                      fill="#0B3D91"
                      fillOpacity={0.6}
                      name="Processed"
                    />
                    <Area
                      type="monotone"
                      dataKey="analyzed"
                      stackId="1"
                      stroke="#0F9D58"
                      fill="#0F9D58"
                      fillOpacity={0.6}
                      name="AI Analyzed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Usage */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-secondary" />
                  <span>Department Usage Distribution</span>
                </CardTitle>
                <CardDescription>Document usage by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.departmentUsage}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="documents"
                      label={({ department, documents }) => `${department}: ${documents.toLocaleString()}`}
                    >
                      {analyticsData.departmentUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* User Engagement */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-accent" />
                <span>User Engagement Analytics</span>
              </CardTitle>
              <CardDescription>Weekly user activity and system interaction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.userEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="#0B3D91"
                    strokeWidth={2}
                    name="Active Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="documentsAccessed"
                    stroke="#0F9D58"
                    strokeWidth={2}
                    name="Documents Accessed"
                  />
                  <Line
                    type="monotone"
                    dataKey="aiQueriesRun"
                    stroke="#FF9933"
                    strokeWidth={2}
                    name="AI Queries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Performance Radar */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Performance Matrix</span>
                </CardTitle>
                <CardDescription>AI system performance across different categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={analyticsData.aiPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Accuracy"
                      dataKey="accuracy"
                      stroke="#0B3D91"
                      fill="#0B3D91"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Speed"
                      dataKey="speed"
                      stroke="#0F9D58"
                      fill="#0F9D58"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Confidence"
                      dataKey="confidence"
                      stroke="#FF9933"
                      fill="#FF9933"
                      fillOpacity={0.3}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Performance Metrics */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  <span>System Performance</span>
                </CardTitle>
                <CardDescription>Real-time system health metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">System Uptime</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-600">{kpiSummary.systemUptime}%</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <Progress value={kpiSummary.systemUptime} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Average Query Response</span>
                    <span className="font-bold text-primary">{kpiSummary.avgQueryTime}s</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">AI Processing Rate</span>
                    <span className="font-bold text-secondary">{kpiSummary.aiProcessingRate}%</span>
                  </div>
                  <Progress value={kpiSummary.aiProcessingRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Error Rate</span>
                    <span className="font-bold text-green-600">0.03%</span>
                  </div>
                  <Progress value={3} className="h-2 bg-green-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-accent" />
                <span>Compliance Analytics</span>
              </CardTitle>
              <CardDescription>Detailed compliance metrics and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.complianceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#0B3D91" name="Current Score" />
                  <Bar dataKey="target" fill="#0F9D58" name="Target Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Compliance Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.complianceMetrics.map((metric, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">{metric.category}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{metric.current}%</span>
                      <div className="flex items-center space-x-1">
                        {metric.trend > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${metric.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.trend > 0 ? '+' : ''}{metric.trend}%
                        </span>
                      </div>
                    </div>
                    <Progress value={metric.current} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {metric.current}%</span>
                      <span>Target: {metric.target}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Department Usage Analytics</span>
              </CardTitle>
              <CardDescription>Detailed usage statistics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analyticsData.departmentUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="documents" fill="#0B3D91" name="Documents" />
                  <Bar dataKey="queries" fill="#0F9D58" name="AI Queries" />
                  <Bar dataKey="users" fill="#FF9933" name="Active Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span>Predictive Trends & Forecasting</span>
              </CardTitle>
              <CardDescription>AI-powered trend analysis and future projections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analyticsData.documentProcessing}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="processed"
                    stroke="#0B3D91"
                    strokeWidth={3}
                    name="Documents Processed"
                  />
                  <Line
                    type="monotone"
                    dataKey="queries"
                    stroke="#0F9D58"
                    strokeWidth={3}
                    name="AI Queries"
                  />
                  <Line
                    type="monotone"
                    dataKey="compliance"
                    stroke="#FF9933"
                    strokeWidth={3}
                    name="Compliance Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trend Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h4 className="font-medium">Growing Trends</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• AI Query volume (+23%)</li>
                  <li>• Document processing (+15%)</li>
                  <li>• User engagement (+18%)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <h4 className="font-medium">Stable Metrics</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• System uptime (99.97%)</li>
                  <li>• AI accuracy (>97%)</li>
                  <li>• Response time (2.3s)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-accent">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <h4 className="font-medium">Optimization Areas</h4>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Document categorization</li>
                  <li>• Cross-dept collaboration</li>
                  <li>• Mobile access patterns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Real-time Status */}
      <Card className="shadow-lg border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-secondary animate-pulse" />
              <div>
                <p className="font-medium">Real-time Analytics Engine</p>
                <p className="text-sm text-muted-foreground">
                  Data refreshed every 5 minutes • Last update: 2 minutes ago • Processing 47,562 data points
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              <Zap className="w-3 h-3 mr-1" />
              LIVE DATA
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}