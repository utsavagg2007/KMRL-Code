import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Search,
  Eye,
  Download,
  Activity,
  Zap,
  Target,
  Award,
  Lock,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const documentAnalyticsData = [
  { month: 'Jan', processed: 1240, analyzed: 1180, alerts: 15 },
  { month: 'Feb', processed: 1350, analyzed: 1320, alerts: 8 },
  { month: 'Mar', processed: 1580, analyzed: 1560, alerts: 12 },
  { month: 'Apr', processed: 1720, analyzed: 1695, alerts: 6 },
  { month: 'May', processed: 1890, analyzed: 1870, alerts: 9 },
  { month: 'Jun', processed: 2100, analyzed: 2085, alerts: 4 }
];

const complianceData = [
  { name: 'Fully Compliant', value: 78, color: '#0F9D58' },
  { name: 'Minor Issues', value: 18, color: '#FF9933' },
  { name: 'Needs Review', value: 4, color: '#dc3545' }
];

const aiPerformanceData = [
  { time: '00:00', accuracy: 94.2, speed: 1.2 },
  { time: '04:00', accuracy: 95.1, speed: 1.1 },
  { time: '08:00', accuracy: 96.8, speed: 0.9 },
  { time: '12:00', accuracy: 97.2, speed: 0.8 },
  { time: '16:00', accuracy: 96.5, speed: 1.0 },
  { time: '20:00', accuracy: 95.3, speed: 1.3 }
];

const recentActivities = [
  { id: 1, action: 'Contract Analysis Completed', document: 'Metro_Extension_Contract_2024.pdf', time: '2 minutes ago', status: 'success' },
  { id: 2, action: 'Compliance Alert Generated', document: 'Safety_Protocol_Update.pdf', time: '15 minutes ago', status: 'warning' },
  { id: 3, action: 'AI Q&A Session', document: 'HR_Policy_Manual.pdf', time: '32 minutes ago', status: 'info' },
  { id: 4, action: 'Document Upload', document: 'Financial_Audit_Report.pdf', time: '1 hour ago', status: 'success' },
  { id: 5, action: 'User Access Granted', document: 'Procurement_Guidelines.pdf', time: '2 hours ago', status: 'info' }
];

const securityMetrics = [
  { metric: 'System Uptime', value: '99.97%', status: 'excellent', trend: '+0.03%' },
  { metric: 'Data Encryption', value: 'AES-256', status: 'secure', trend: 'Active' },
  { metric: 'Access Attempts', value: '2,847', status: 'normal', trend: '+12%' },
  { metric: 'Failed Logins', value: '3', status: 'low', trend: '-67%' }
];

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setAnimateCards(true);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground">
            KMRL Document Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time insights and AI-powered document management
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Current Time</div>
            <div className="font-mono text-lg text-foreground">
              {currentTime.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            <Activity className="w-3 h-3 mr-1" />
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={`transition-all duration-500 hover:shadow-lg ${animateCards ? 'animate-in slide-in-from-bottom-4' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+23%</span> from last month
            </p>
            <Progress value={78} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className={`transition-all duration-500 hover:shadow-lg ${animateCards ? 'animate-in slide-in-from-bottom-4' : ''} delay-100`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">AI Analysis Rate</CardTitle>
            <Zap className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">97.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+2.1%</span> accuracy improved
            </p>
            <Progress value={97} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className={`transition-all duration-500 hover:shadow-lg ${animateCards ? 'animate-in slide-in-from-bottom-4' : ''} delay-200`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">186</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+12</span> new this week
            </p>
            <Progress value={65} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className={`transition-all duration-500 hover:shadow-lg ${animateCards ? 'animate-in slide-in-from-bottom-4' : ''} delay-300`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-secondary">A+</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">100%</span> compliance maintained
            </p>
            <Progress value={100} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Document Processing Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={documentAnalyticsData}>
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
                      dataKey="processed" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary)/0.2)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="analyzed" 
                      stackId="2"
                      stroke="hsl(var(--secondary))" 
                      fill="hsl(var(--secondary)/0.2)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="performance">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={aiPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="compliance">
                <div className="flex items-center justify-center h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="text-sm">{metric.metric}</div>
                  <div className="text-xs text-muted-foreground">{metric.trend}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">{metric.value}</div>
                  <Badge 
                    variant={metric.status === 'excellent' ? 'default' : metric.status === 'secure' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 text-secondary" />
                <span className="text-sm">Encryption Status</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All data encrypted with military-grade AES-256 encryption. 
                Zero-trust architecture active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-time Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-secondary' :
                    activity.status === 'warning' ? 'bg-accent' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">{activity.action}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {activity.document}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Quick Actions & Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center gap-2" variant="outline">
                <Search className="h-5 w-5" />
                <span className="text-xs">Global Search</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center gap-2" variant="outline">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export Report</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">AI Recommendation</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  5 documents require immediate compliance review based on recent regulatory changes.
                </p>
                <Button size="sm" className="mt-2 h-7 text-xs">
                  Review Now
                </Button>
              </div>
              
              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-secondary" />
                  <span className="text-sm">System Health</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All systems operational. Next maintenance window: Sunday 2:00 AM IST.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">AI Processing Active</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">All Services Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Last Backup: 2 hours ago</span>
          </div>
        </div>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
          KMRL Document Intelligence v2.4.1
        </Badge>
      </div>
    </div>
  );
}