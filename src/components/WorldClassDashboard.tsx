import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database,
  Search,
  Brain,
  Lock,
  Activity,
  BarChart3,
  FileCheck,
  Globe,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

interface DashboardProps {
  user: {
    name: string;
    department: string;
    role: string;
    clearanceLevel: number;
  };
}

export function WorldClassDashboard({ user }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiProcessingActive, setAiProcessingActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for government-grade metrics
  const kpiData = {
    totalDocuments: 47562,
    aiProcessed: 44891,
    complianceScore: 98.7,
    securityThreats: 0,
    activeUsers: 143,
    documentsToday: 387,
    aiQueries: 1249,
    riskAlerts: 3
  };

  const documentsByType = [
    { name: 'Contracts', value: 15420, color: '#0B3D91' },
    { name: 'Tenders', value: 12876, color: '#0F9D58' },
    { name: 'HR Policies', value: 8934, color: '#FF9933' },
    { name: 'Technical Manuals', value: 6789, color: '#6f42c1' },
    { name: 'Financial Reports', value: 3543, color: '#20c997' }
  ];

  const processingTrends = [
    { month: 'Jan', processed: 3245, queries: 892 },
    { month: 'Feb', processed: 3876, queries: 1034 },
    { month: 'Mar', processed: 4123, queries: 1187 },
    { month: 'Apr', processed: 4567, queries: 1342 },
    { month: 'May', processed: 4891, queries: 1456 },
    { month: 'Jun', processed: 5234, queries: 1587 }
  ];

  const complianceMetrics = [
    { category: 'Contract Compliance', score: 99.2, trend: '+0.3%' },
    { category: 'Financial Documentation', score: 98.8, trend: '+0.1%' },
    { category: 'HR Policy Adherence', score: 97.5, trend: '+0.5%' },
    { category: 'Technical Standards', score: 99.1, trend: '+0.2%' }
  ];

  const recentActivities = [
    { time: '14:32', action: 'AI Analysis completed for Tender Document TD-2025-001', type: 'success' },
    { time: '14:28', action: 'Compliance alert resolved: Contract CX-891-2025', type: 'info' },
    { time: '14:25', action: 'New document uploaded: HR Policy Update v2.3', type: 'neutral' },
    { time: '14:20', action: 'Security scan completed - No threats detected', type: 'success' },
    { time: '14:15', action: 'AI Q&A session: 47 queries processed', type: 'info' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            KMRL Document Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user.name} • {user.department} • Security Level {user.clearanceLevel}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
            <Shield className="w-3 h-3 mr-1" />
            Secure Connection
          </Badge>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleTimeString()} IST
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{kpiData.totalDocuments.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3 mr-1 text-secondary" />
              <span className="text-secondary">+387</span> today
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Processed</CardTitle>
            <Brain className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{kpiData.aiProcessed.toLocaleString()}</div>
            <Progress value={94.4} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">94.4% coverage</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{kpiData.complianceScore}%</div>
            <div className="flex items-center text-xs text-secondary mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +0.3% this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">SECURE</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
              No threats detected
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Document Distribution</span>
                </CardTitle>
                <CardDescription>By document type and category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={documentsByType}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
                    >
                      {documentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Processing Trends */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <span>Processing Trends</span>
                </CardTitle>
                <CardDescription>Monthly document processing and AI queries</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={processingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="processed" stroke="#0B3D91" fill="#0B3D91" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="queries" stroke="#0F9D58" fill="#0F9D58" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Metrics */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-accent" />
                <span>Compliance Metrics</span>
              </CardTitle>
              <CardDescription>Real-time compliance monitoring across all categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2 p-4 rounded-lg bg-muted/50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">{metric.category}</h4>
                      <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary">
                        {metric.trend}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">{metric.score}%</div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Real-time system activities and AI processing events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-shrink-0">
                      {activity.type === 'success' && <CheckCircle className="w-4 h-4 text-secondary mt-1" />}
                      {activity.type === 'info' && <Clock className="w-4 h-4 text-primary mt-1" />}
                      {activity.type === 'neutral' && <FileText className="w-4 h-4 text-muted-foreground mt-1" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-center">
                <Button variant="outline" size="sm">
                  <Activity className="w-4 h-4 mr-2" />
                  View Full Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Shield className="w-5 h-5" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">System Integrity</span>
                  <Badge className="bg-green-600 hover:bg-green-700">SECURE</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Data Encryption</span>
                  <Badge className="bg-green-600 hover:bg-green-700">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Access Control</span>
                  <Badge className="bg-green-600 hover:bg-green-700">ENFORCED</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Audit Logging</span>
                  <Badge className="bg-green-600 hover:bg-green-700">ENABLED</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>Access Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Sessions</span>
                  <span className="font-bold text-primary">143</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Failed Login Attempts</span>
                  <span className="font-bold text-green-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Document Access Today</span>
                  <span className="font-bold text-primary">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>AI Queries Processed</span>
                  <span className="font-bold text-secondary">1,249</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Advanced Analytics</span>
              </CardTitle>
              <CardDescription>Comprehensive document intelligence metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="processed" fill="#0B3D91" name="Documents Processed" />
                  <Bar dataKey="queries" fill="#0F9D58" name="AI Queries" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Processing Status */}
      {aiProcessingActive && (
        <Card className="shadow-lg border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-secondary animate-pulse" />
                <div>
                  <p className="font-medium">AI Processing Active</p>
                  <p className="text-sm text-muted-foreground">
                    Currently analyzing 12 documents • Next scheduled scan in 45 minutes
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                PROCESSING
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}