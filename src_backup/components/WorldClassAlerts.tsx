import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import {
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  Bell,
  TrendingUp,
  TrendingDown,
  FileText,
  Users,
  Calendar,
  Search,
  Filter,
  Settings,
  Zap,
  Database,
  Eye,
  Archive,
  AlertCircle,
  Info,
  XCircle,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: 'compliance' | 'security' | 'operational' | 'financial' | 'document';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  timestamp: Date;
  source: string;
  assignedTo?: string;
  dueDate?: Date;
  documentId?: string;
}

interface ComplianceMetric {
  category: string;
  score: number;
  trend: number;
  lastUpdate: Date;
  issues: number;
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Contract Compliance Deviation Detected',
    description: 'Station Maintenance Service Contract (CX-891-2025) shows non-compliance with safety protocols section 4.2.',
    severity: 'high',
    category: 'compliance',
    status: 'active',
    timestamp: new Date('2025-01-10T14:30:00'),
    source: 'AI Compliance Monitor',
    assignedTo: 'Legal Team',
    dueDate: new Date('2025-01-15T17:00:00'),
    documentId: 'CX-891-2025'
  },
  {
    id: 'ALT-002',
    title: 'Document Access Anomaly',
    description: 'Unusual access pattern detected for classified technical manual TM-SYS-2025-012.',
    severity: 'medium',
    category: 'security',
    status: 'acknowledged',
    timestamp: new Date('2025-01-10T13:45:00'),
    source: 'Security Monitor',
    assignedTo: 'Security Team',
    documentId: 'TM-SYS-2025-012'
  },
  {
    id: 'ALT-003',
    title: 'Policy Update Required',
    description: 'Employee Safety Guidelines v2.3 requires update to align with new government regulations.',
    severity: 'medium',
    category: 'compliance',
    status: 'active',
    timestamp: new Date('2025-01-10T12:15:00'),
    source: 'Policy Monitor',
    assignedTo: 'HR Department',
    dueDate: new Date('2025-01-20T17:00:00'),
    documentId: 'HR-POL-2025-003'
  },
  {
    id: 'ALT-004',
    title: 'Financial Report Validation Success',
    description: 'Q4 Financial Performance Report has passed all compliance checks successfully.',
    severity: 'info',
    category: 'financial',
    status: 'resolved',
    timestamp: new Date('2025-01-10T11:30:00'),
    source: 'Financial Validator',
    documentId: 'FIN-REP-2024-Q4'
  },
  {
    id: 'ALT-005',
    title: 'Tender Document Processing Complete',
    description: 'Metro Line Extension Tender Documentation has been fully analyzed and validated.',
    severity: 'info',
    category: 'document',
    status: 'resolved',
    timestamp: new Date('2025-01-10T10:45:00'),
    source: 'Document Processor',
    documentId: 'TD-2025-001'
  }
];

const complianceMetrics: ComplianceMetric[] = [
  { category: 'Contract Compliance', score: 98.7, trend: 0.3, lastUpdate: new Date(), issues: 1 },
  { category: 'Safety Protocols', score: 99.2, trend: 0.1, lastUpdate: new Date(), issues: 0 },
  { category: 'Financial Documentation', score: 97.8, trend: -0.2, lastUpdate: new Date(), issues: 2 },
  { category: 'HR Policies', score: 96.5, trend: 1.2, lastUpdate: new Date(), issues: 3 },
  { category: 'Technical Standards', score: 99.1, trend: 0.5, lastUpdate: new Date(), issues: 1 }
];

const alertTrends = [
  { month: 'Jan', critical: 2, high: 5, medium: 12, low: 8, resolved: 23 },
  { month: 'Feb', critical: 1, high: 7, medium: 15, low: 6, resolved: 27 },
  { month: 'Mar', critical: 0, high: 4, medium: 18, low: 9, resolved: 29 },
  { month: 'Apr', critical: 1, high: 6, medium: 14, low: 11, resolved: 31 },
  { month: 'May', critical: 0, high: 3, medium: 16, low: 7, resolved: 26 },
  { month: 'Jun', critical: 0, high: 2, medium: 11, low: 5, resolved: 18 }
];

const riskDistribution = [
  { name: 'Low Risk', value: 42, color: '#10B981' },
  { name: 'Medium Risk', value: 31, color: '#F59E0B' },
  { name: 'High Risk', value: 23, color: '#EF4444' },
  { name: 'Critical Risk', value: 4, color: '#DC2626' }
];

export function WorldClassAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesCategory && matchesStatus;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-red-600 hover:bg-red-700">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Low</Badge>;
      case 'info':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Info</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Acknowledged</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'dismissed':
        return <Badge variant="outline">Dismissed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    avgResolutionTime: '4.2 hours'
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Compliance & Alert Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring, compliance tracking, and intelligent alerting system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={realTimeMonitoring}
              onCheckedChange={setRealTimeMonitoring}
            />
            <span className="text-sm">Real-time Monitoring</span>
          </div>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
            <Activity className="w-3 h-3 mr-1" />
            System Active
          </Badge>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold text-primary">{alertStats.total}</p>
              </div>
              <Bell className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">{alertStats.active}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-orange-600">{alertStats.critical}</p>
              </div>
              <XCircle className="w-8 h-8 text-orange-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{alertStats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                <p className="text-2xl font-bold text-blue-600">{alertStats.avgResolutionTime}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Compliance</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <span>Alert Dashboard</span>
              </CardTitle>
              <CardDescription>
                {filteredAlerts.length} alerts found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              {getSeverityIcon(alert.severity)}
                              <p className="font-medium">{alert.title}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{alert.source}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <span>{alert.timestamp.toLocaleString()}</span>
                              {alert.documentId && (
                                <>
                                  <Separator orientation="vertical" className="h-3" />
                                  <span>Doc: {alert.documentId}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {alert.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(alert.status)}</TableCell>
                        <TableCell>
                          {alert.assignedTo ? (
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span className="text-sm">{alert.assignedTo}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {alert.dueDate ? (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span className="text-sm">{alert.dueDate.toLocaleDateString()}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">No due date</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Archive className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>Compliance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-primary">{metric.score}%</span>
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
                    <Progress value={metric.score} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{metric.issues} active issues</span>
                      <span>Last updated: {metric.lastUpdate.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Alert Trends & Analytics</span>
              </CardTitle>
              <CardDescription>Historical alert patterns and resolution metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={alertTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="critical" stroke="#DC2626" strokeWidth={2} name="Critical" />
                  <Line type="monotone" dataKey="high" stroke="#EF4444" strokeWidth={2} name="High" />
                  <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={2} name="Medium" />
                  <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Alert Configuration</span>
              </CardTitle>
              <CardDescription>Configure alert thresholds and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SMS Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Critical Alert Sound</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Desktop Notifications</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Monitoring Thresholds</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Compliance Score Threshold</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Document Access Anomaly</span>
                    <span className="font-medium">5 per hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Failed Login Attempts</span>
                    <span className="font-medium">3 attempts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Monitoring Status */}
      {realTimeMonitoring && (
        <Card className="shadow-lg border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-secondary animate-pulse" />
                <div>
                  <p className="font-medium">Real-time Monitoring Active</p>
                  <p className="text-sm text-muted-foreground">
                    Scanning 47,562 documents • Last scan: 2 minutes ago • Next scan: 3 minutes
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                <Zap className="w-3 h-3 mr-1" />
                MONITORING
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}