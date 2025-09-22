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
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Area, 
  AreaChart,
  Legend
} from 'recharts';

interface DashboardProps {
  user: {
    name: string;
    department: string;
    role: string;
    clearanceLevel: number;
  };
}

export function PerfectDashboard({ user }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiProcessingActive, setAiProcessingActive] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Professional government-grade metrics
  const kpiData = {
    totalDocuments: 47562,
    aiProcessed: 45891,
    complianceScore: 98.7,
    securityThreats: 0,
    activeUsers: 143,
    documentsToday: 387,
    aiQueries: 1249,
    riskAlerts: 2,
    avgProcessingTime: 2.3,
    systemUptime: 99.97
  };

  const documentsByType = [
    { name: 'Contracts', value: 15420, color: '#0B3D91', percentage: 32.4 },
    { name: 'Tenders', value: 12876, color: '#0F9D58', percentage: 27.1 },
    { name: 'HR Policies', value: 8934, color: '#FF9933', percentage: 18.8 },
    { name: 'Technical Manuals', value: 6789, color: '#6f42c1', percentage: 14.3 },
    { name: 'Financial Reports', value: 3543, color: '#20c997', percentage: 7.4 }
  ];

  const processingTrends = [
    { month: 'Jan', processed: 3245, queries: 892, compliance: 98.2 },
    { month: 'Feb', processed: 3876, queries: 1034, compliance: 98.5 },
    { month: 'Mar', processed: 4123, queries: 1187, compliance: 98.8 },
    { month: 'Apr', processed: 4567, queries: 1342, compliance: 99.1 },
    { month: 'May', processed: 4891, queries: 1456, compliance: 99.0 },
    { month: 'Jun', processed: 5234, queries: 1587, compliance: 99.2 }
  ];

  const complianceMetrics = [
    { category: 'Contract Compliance', score: 99.2, trend: 0.3, status: 'excellent' },
    { category: 'Financial Documentation', score: 98.8, trend: 0.1, status: 'excellent' },
    { category: 'HR Policy Adherence', score: 97.5, trend: 0.5, status: 'good' },
    { category: 'Technical Standards', score: 99.1, trend: 0.2, status: 'excellent' },
    { category: 'Security Protocols', score: 99.8, trend: 0.0, status: 'excellent' }
  ];

  const recentActivities = [
    { 
      time: '14:32', 
      action: 'AI Analysis completed for Tender Document TD-2025-001', 
      type: 'success',
      user: 'System AI',
      priority: 'normal'
    },
    { 
      time: '14:28', 
      action: 'Compliance alert resolved: Contract CX-891-2025', 
      type: 'info',
      user: 'Legal Team',
      priority: 'high'
    },
    { 
      time: '14:25', 
      action: 'New document uploaded: HR Policy Update v2.3', 
      type: 'neutral',
      user: 'HR Department',
      priority: 'normal'
    },
    { 
      time: '14:20', 
      action: 'Security scan completed - No threats detected', 
      type: 'success',
      user: 'Security System',
      priority: 'normal'
    },
    { 
      time: '14:15', 
      action: 'AI Q&A session: 47 queries processed successfully', 
      type: 'info',
      user: 'Multiple Users',
      priority: 'normal'
    }
  ];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-3 h-3 text-green-600" />;
    if (trend < 0) return <ArrowDown className="w-3 h-3 text-red-600" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  const getComplianceColor = (score: number) => {
    if (score >= 99) return 'text-green-600';
    if (score >= 97) return 'text-blue-600';
    if (score >= 95) return 'text-yellow-600';
    return 'text-red-600';
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
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">KMRL Document Intelligence Dashboard</h1>
                  <p className="text-primary-foreground/90 text-sm">
                    Kochi Metro Rail Limited • Government of Kerala
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
                <span>Welcome, {user.name}</span>
                <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
                <span>{user.department}</span>
                <Separator orientation="vertical" className="h-4 bg-primary-foreground/20" />
                <span>Security Level {user.clearanceLevel}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-500/10 text-green-100 border-green-500/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                System Operational
              </Badge>
              <div className="text-right text-sm">
                <div className="text-primary-foreground font-medium">
                  {currentTime.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-primary-foreground/70">
                  {currentTime.toLocaleDateString('en-IN', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-3xl font-bold text-primary">{formatNumber(kpiData.totalDocuments)}</p>
                  <div className="flex items-center space-x-1 text-xs">
                    {getTrendIcon(0.15)}
                    <span className="text-green-600 font-medium">+387 today</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                  <p className="text-3xl font-bold text-secondary">{formatNumber(kpiData.aiProcessed)}</p>
                  <div className="space-y-1">
                    <Progress value={96.5} className="h-2" />
                    <p className="text-xs text-muted-foreground">96.5% completion rate</p>
                  </div>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Brain className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-accent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                  <p className="text-3xl font-bold text-accent">{kpiData.complianceScore}%</p>
                  <div className="flex items-center space-x-1 text-xs">
                    {getTrendIcon(0.3)}
                    <span className="text-green-600 font-medium">+0.3% this week</span>
                  </div>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">System Health</p>
                  <p className="text-3xl font-bold text-green-600">{kpiData.systemUptime}%</p>
                  <div className="flex items-center space-x-1 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">Excellent</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-full">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4 gap-1">
              <TabsTrigger value="overview" className="flex items-center space-x-2 px-4 py-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2 px-4 py-2">
                <TrendingUp className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center space-x-2 px-4 py-2">
                <Shield className="w-4 h-4" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2 px-4 py-2">
                <Activity className="w-4 h-4" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Document Distribution Chart */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-primary" />
                    <span>Document Distribution</span>
                  </CardTitle>
                  <CardDescription>Distribution by document type and volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={documentsByType}
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={false}
                        >
                          {documentsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatNumber(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-1 gap-2">
                      {documentsByType.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{formatNumber(item.value)}</div>
                            <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Trends */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                    <span>Processing Trends</span>
                  </CardTitle>
                  <CardDescription>Monthly document processing and AI query trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={processingTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'white', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [formatNumber(value as number), '']}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="processed"
                        stackId="1"
                        stroke="#0B3D91"
                        fill="#0B3D91"
                        fillOpacity={0.6}
                        name="Documents Processed"
                      />
                      <Area
                        type="monotone"
                        dataKey="queries"
                        stackId="2"
                        stroke="#0F9D58"
                        fill="#0F9D58"
                        fillOpacity={0.6}
                        name="AI Queries"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span>Compliance Monitoring</span>
                </CardTitle>
                <CardDescription>Real-time compliance scores across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {complianceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-muted">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm leading-tight">{metric.category}</h4>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(metric.trend)}
                          <span className={`text-xs font-medium ${metric.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.trend > 0 ? '+' : ''}{metric.trend}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className={`text-2xl font-bold ${getComplianceColor(metric.score)}`}>
                          {metric.score}%
                        </div>
                        <Progress value={metric.score} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Target: 95%</span>
                          <Badge 
                            variant={metric.status === 'excellent' ? 'default' : 'secondary'}
                            className={metric.status === 'excellent' ? 'bg-green-500 hover:bg-green-600' : ''}
                          >
                            {metric.status === 'excellent' ? 'Excellent' : 'Good'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>System Activity Feed</span>
                </CardTitle>
                <CardDescription>Real-time system activities and processing events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors border border-muted/50">
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {activity.type === 'info' && <Clock className="w-5 h-5 text-blue-600" />}
                        {activity.type === 'neutral' && <FileText className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium leading-relaxed">{activity.action}</p>
                          <Badge 
                            variant={activity.priority === 'high' ? 'destructive' : 'outline'}
                            className="ml-2 text-xs"
                          >
                            {activity.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="font-medium">{activity.time}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">
                    <Activity className="w-4 h-4 mr-2" />
                    View Complete Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Advanced Analytics</span>
                </CardTitle>
                <CardDescription>Comprehensive performance and trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={processingTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'white', 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value) => [formatNumber(value as number), '']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="processed"
                      stroke="#0B3D91"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Documents Processed"
                    />
                    <Line
                      type="monotone"
                      dataKey="queries"
                      stroke="#0F9D58"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="AI Queries"
                    />
                    <Line
                      type="monotone"
                      dataKey="compliance"
                      stroke="#FF9933"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Compliance Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Processing Status Footer */}
        {aiProcessingActive && (
          <Card className="shadow-lg border-l-4 border-l-secondary bg-gradient-to-r from-secondary/5 via-background to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Brain className="w-5 h-5 text-secondary animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium">AI Document Intelligence Engine</p>
                    <p className="text-sm text-muted-foreground">
                      Processing queue: 12 documents • Average processing time: {kpiData.avgProcessingTime} minutes • Next scan: 45 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    <Zap className="w-3 h-3 mr-1" />
                    ACTIVE
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {formatNumber(kpiData.aiProcessed)} Processed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}