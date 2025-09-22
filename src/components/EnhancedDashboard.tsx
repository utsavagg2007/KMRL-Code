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
  Globe,
  ArrowUp,
  ArrowDown,
  Minus,
  Bot,
  Database,
  Settings,
  Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { motion, AnimatePresence } from 'motion/react';
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
  { month: 'Jan', processed: 1240, analyzed: 1180, alerts: 15, efficiency: 95.2 },
  { month: 'Feb', processed: 1350, analyzed: 1320, alerts: 8, efficiency: 97.8 },
  { month: 'Mar', processed: 1580, analyzed: 1560, alerts: 12, efficiency: 98.7 },
  { month: 'Apr', processed: 1720, analyzed: 1695, alerts: 6, efficiency: 98.5 },
  { month: 'May', processed: 1890, analyzed: 1870, alerts: 9, efficiency: 99.0 },
  { month: 'Jun', processed: 2100, analyzed: 2085, alerts: 4, efficiency: 99.3 }
];

const complianceData = [
  { name: 'Compliant', value: 92, color: '#0F9D58' },
  { name: 'Minor Issues', value: 6, color: '#FF9933' },
  { name: 'Critical', value: 2, color: '#dc3545' }
];

const recentActivities = [
  { id: 1, type: 'document', title: 'Metro Extension Contract - Phase 2', time: '2 minutes ago', status: 'analyzed', priority: 'high' },
  { id: 2, type: 'alert', title: 'Compliance Check Required', time: '15 minutes ago', status: 'pending', priority: 'medium' },
  { id: 3, type: 'user', title: 'New user access granted - Finance Dept', time: '1 hour ago', status: 'completed', priority: 'low' },
  { id: 4, type: 'system', title: 'Daily backup completed successfully', time: '2 hours ago', status: 'completed', priority: 'low' },
  { id: 5, type: 'document', title: 'HR Policy Update v2.3', time: '3 hours ago', status: 'reviewed', priority: 'medium' }
];

const departmentStats = [
  { dept: 'Legal', documents: 456, processed: 445, efficiency: 97.6, trend: 'up' },
  { dept: 'Finance', documents: 234, processed: 230, efficiency: 98.3, trend: 'up' },
  { dept: 'HR', documents: 189, processed: 187, efficiency: 98.9, trend: 'up' },
  { dept: 'Procurement', documents: 567, processed: 559, efficiency: 98.6, trend: 'down' },
  { dept: 'Operations', documents: 123, processed: 121, efficiency: 98.4, trend: 'stable' }
];

const systemMetrics = {
  uptime: 99.97,
  responseTime: 245, // ms
  activeUsers: 47,
  aiAccuracy: 98.7,
  dataProcessed: '2.4TB',
  securityScans: 1247
};

export function EnhancedDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedStats, setAnimatedStats] = useState({
    documents: 0,
    analyzed: 0,
    alerts: 0,
    efficiency: 0
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate statistics on load
  useEffect(() => {
    const finalStats = {
      documents: 2485,
      analyzed: 2461,
      alerts: 24,
      efficiency: 99.1
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        documents: Math.floor(finalStats.documents * progress),
        analyzed: Math.floor(finalStats.analyzed * progress),
        alerts: Math.floor(finalStats.alerts * progress),
        efficiency: parseFloat((finalStats.efficiency * progress).toFixed(1))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header Section */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Real-time insights into KMRL document intelligence system
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {currentTime.toLocaleTimeString()}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            System Active
          </Badge>
        </div>
      </motion.div>

      {/* Critical Alerts */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid gap-4"
        >
          <Alert className="border-l-4 border-l-accent">
            <Bell className="w-4 h-4" />
            <AlertTitle>Urgent: Contract Review Required</AlertTitle>
            <AlertDescription>
              Metro Line 3 extension contract requires immediate legal review. 
              <Button variant="link" className="p-0 h-auto ml-2">
                View Details →
              </Button>
            </AlertDescription>
          </Alert>
        </motion.div>
      </AnimatePresence>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Documents',
            value: animatedStats.documents.toLocaleString(),
            icon: FileText,
            color: 'bg-primary',
            trend: '+12%',
            trendUp: true
          },
          {
            title: 'AI Analyzed',
            value: animatedStats.analyzed.toLocaleString(),
            icon: Bot,
            color: 'bg-secondary',
            trend: '+8%',
            trendUp: true
          },
          {
            title: 'Active Alerts',
            value: animatedStats.alerts.toString(),
            icon: AlertTriangle,
            color: 'bg-accent',
            trend: '-15%',
            trendUp: false
          },
          {
            title: 'System Efficiency',
            value: `${animatedStats.efficiency}%`,
            icon: Zap,
            color: 'bg-chart-2',
            trend: '+2.1%',
            trendUp: true
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <motion.p 
                      className="text-3xl font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <div className="flex items-center gap-1 text-sm">
                      {stat.trendUp ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                        {stat.trend}
                      </span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <motion.div 
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            System Health
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Processing Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Document Processing Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={documentAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="processed" 
                        stackId="1"
                        stroke="#0B3D91" 
                        fill="#0B3D91"
                        fillOpacity={0.8}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="analyzed" 
                        stackId="2"
                        stroke="#0F9D58" 
                        fill="#0F9D58"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compliance Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {complianceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {complianceData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-4">
            {departmentStats.map((dept, index) => (
              <motion.div
                key={dept.dept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{dept.dept}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{dept.documents} documents</span>
                          <span>{dept.processed} processed</span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">{dept.efficiency}%</span>
                          {getTrendIcon(dept.trend)}
                        </div>
                        <Progress value={dept.efficiency} className="w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'System Uptime', value: `${systemMetrics.uptime}%`, icon: Clock, color: 'text-green-500' },
              { label: 'Response Time', value: `${systemMetrics.responseTime}ms`, icon: Zap, color: 'text-blue-500' },
              { label: 'Active Users', value: systemMetrics.activeUsers.toString(), icon: Users, color: 'text-purple-500' },
              { label: 'AI Accuracy', value: `${systemMetrics.aiAccuracy}%`, icon: Bot, color: 'text-orange-500' },
              { label: 'Data Processed', value: systemMetrics.dataProcessed, icon: Database, color: 'text-cyan-500' },
              { label: 'Security Scans', value: systemMetrics.securityScans.toLocaleString(), icon: Shield, color: 'text-red-500' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(activity.priority)}>
                        {activity.priority}
                      </Badge>
                      <Badge variant="outline">
                        {activity.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Upload Document', icon: FileText, color: 'bg-primary' },
                { label: 'Run AI Analysis', icon: Bot, color: 'bg-secondary' },
                { label: 'Security Scan', icon: Shield, color: 'bg-accent' },
                { label: 'Generate Report', icon: Download, color: 'bg-chart-4' }
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="h-20 w-full flex flex-col gap-2 hover:shadow-lg transition-all"
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}