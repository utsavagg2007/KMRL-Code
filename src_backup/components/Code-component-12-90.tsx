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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
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
  Activity,
  BellRing,
  Target,
  BarChart3,
  PieChart,
  RefreshCw,
  Download,
  Plus,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as PieChartComponent, Pie, Cell, AreaChart, Area } from 'recharts';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: 'compliance' | 'security' | 'operational' | 'financial' | 'document' | 'system';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed' | 'investigating';
  timestamp: Date;
  source: string;
  assignedTo?: string;
  dueDate?: Date;
  documentId?: string;
  department: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  impact: 'critical' | 'high' | 'medium' | 'low';
  resolution?: string;
  estimatedTime?: number;
}

interface ComplianceMetric {
  category: string;
  score: number;
  trend: number;
  lastUpdate: Date;
  issues: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

const mockAlerts: Alert[] = [
  {
    id: 'ALT-2025-001',
    title: 'Contract Compliance Deviation - Safety Protocols',
    description: 'Station Maintenance Service Contract (CX-891-2025) shows non-compliance with updated safety protocols section 4.2. Immediate review required for vendor compliance verification.',
    severity: 'high',
    category: 'compliance',
    status: 'active',
    timestamp: new Date('2025-01-10T14:30:00'),
    source: 'AI Compliance Monitor',
    assignedTo: 'Legal & Compliance Team',
    dueDate: new Date('2025-01-15T17:00:00'),
    documentId: 'CX-891-2025',
    department: 'Legal Affairs',
    priority: 'high',
    impact: 'medium',
    estimatedTime: 48
  },
  {
    id: 'ALT-2025-002',
    title: 'Unusual Document Access Pattern Detected',
    description: 'Anomalous access pattern detected for classified technical manual TM-SYS-2025-012. Multiple access attempts from external IP addresses during non-business hours.',
    severity: 'medium',
    category: 'security',
    status: 'investigating',
    timestamp: new Date('2025-01-10T13:45:00'),
    source: 'Security Monitoring System',
    assignedTo: 'Cybersecurity Team',
    documentId: 'TM-SYS-2025-012',
    department: 'IT Security',
    priority: 'high',
    impact: 'high',
    estimatedTime: 24
  },
  {
    id: 'ALT-2025-003',
    title: 'Policy Update Required - Government Regulation Change',
    description: 'Employee Safety Guidelines v2.3 requires immediate update to align with new Ministry of Railways safety regulations published on January 8, 2025.',
    severity: 'medium',
    category: 'compliance',
    status: 'acknowledged',
    timestamp: new Date('2025-01-10T12:15:00'),
    source: 'Regulatory Compliance Monitor',
    assignedTo: 'HR Policy Team',
    dueDate: new Date('2025-01-20T17:00:00'),
    documentId: 'HR-POL-2025-003',
    department: 'Human Resources',
    priority: 'normal',
    impact: 'medium',
    estimatedTime: 72
  },
  {
    id: 'ALT-2025-004',
    title: 'Financial Report Validation Completed Successfully',
    description: 'Q4 2024 Financial Performance Report has successfully passed all automated compliance checks and regulatory validation processes. Ready for board presentation.',
    severity: 'info',
    category: 'financial',
    status: 'resolved',
    timestamp: new Date('2025-01-10T11:30:00'),
    source: 'Financial Compliance Validator',
    documentId: 'FIN-REP-2024-Q4',
    department: 'Finance & Accounts',
    priority: 'normal',
    impact: 'low',
    resolution: 'All compliance checks passed successfully'
  },
  {
    id: 'ALT-2025-005',
    title: 'Document Processing Performance Alert',
    description: 'AI document processing queue has exceeded 15 documents. Current processing time is 23% above standard. System resources may need optimization.',
    severity: 'low',
    category: 'system',
    status: 'active',
    timestamp: new Date('2025-01-10T10:45:00'),
    source: 'System Performance Monitor',
    assignedTo: 'IT Operations Team',
    department: 'Information Technology',
    priority: 'low',
    impact: 'low',
    estimatedTime: 12
  },
  {
    id: 'ALT-2025-006',
    title: 'Critical: Tender Document Deadline Approaching',
    description: 'Metro Line Extension Tender Documentation (TD-2025-001) submission deadline is in 48 hours. Final compliance review and approval pending from multiple departments.',
    severity: 'critical',
    category: 'operational',
    status: 'active',
    timestamp: new Date('2025-01-10T09:00:00'),
    source: 'Project Management System',
    assignedTo: 'Project Management Office',
    dueDate: new Date('2025-01-12T18:00:00'),
    documentId: 'TD-2025-001',
    department: 'Infrastructure Development',
    priority: 'urgent',
    impact: 'critical',
    estimatedTime: 36
  }
];

const complianceMetrics: ComplianceMetric[] = [
  { category: 'Contract Compliance', score: 98.7, trend: 0.3, lastUpdate: new Date(), issues: 1, target: 99.0, status: 'good' },
  { category: 'Safety Protocols', score: 99.2, trend: 0.1, lastUpdate: new Date(), issues: 0, target: 99.5, status: 'excellent' },
  { category: 'Financial Documentation', score: 97.8, trend: -0.2, lastUpdate: new Date(), issues: 2, target: 98.5, status: 'good' },
  { category: 'HR Policies', score: 96.5, trend: 1.2, lastUpdate: new Date(), issues: 3, target: 98.0, status: 'warning' },
  { category: 'Technical Standards', score: 99.1, trend: 0.5, lastUpdate: new Date(), issues: 1, target: 99.0, status: 'excellent' },
  { category: 'Security Protocols', score: 99.8, trend: 0.0, lastUpdate: new Date(), issues: 0, target: 99.5, status: 'excellent' }
];

const alertTrends = [
  { month: 'Jan', critical: 2, high: 5, medium: 12, low: 8, resolved: 23 },
  { month: 'Feb', critical: 1, high: 7, medium: 15, low: 6, resolved: 27 },
  { month: 'Mar', critical: 0, high: 4, medium: 18, low: 9, resolved: 29 },
  { month: 'Apr', critical: 1, high: 6, medium: 14, low: 11, resolved: 31 },
  { month: 'May', critical: 0, high: 3, medium: 16, low: 7, resolved: 26 },
  { month: 'Jun', critical: 1, high: 2, medium: 11, low: 5, resolved: 19 }
];

const riskDistribution = [
  { name: 'Low Risk', value: 42, color: '#10B981' },
  { name: 'Medium Risk', value: 31, color: '#F59E0B' },
  { name: 'High Risk', value: 23, color: '#EF4444' },
  { name: 'Critical Risk', value: 4, color: '#DC2626' }
];

export function PerfectAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || alert.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || alert.department === selectedDepartment;
    return matchesSearch && matchesSeverity && matchesCategory && matchesStatus && matchesDepartment;
  });

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'critical': { className: 'bg-red-600 hover:bg-red-700 text-white', icon: XCircle },
      'high': { className: 'bg-orange-500 hover:bg-orange-600 text-white', icon: AlertTriangle },
      'medium': { className: 'bg-yellow-500 hover:bg-yellow-600 text-white', icon: AlertCircle },
      'low': { className: 'bg-blue-500 hover:bg-blue-600 text-white', icon: Info },
      'info': { className: 'bg-green-500 hover:bg-green-600 text-white', icon: CheckCircle }
    };

    const config = severityConfig[severity as keyof typeof severityConfig];
    const IconComponent = config.icon;

    return (
      <Badge className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { className: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
      'acknowledged': { className: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Eye },
      'investigating': { className: 'bg-blue-100 text-blue-800 border-blue-200', icon: Search },
      'resolved': { className: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      'dismissed': { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: Archive }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <Badge variant="outline" className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'urgent': { className: 'bg-red-100 text-red-800 border-red-300' },
      'high': { className: 'bg-orange-100 text-orange-800 border-orange-300' },
      'normal': { className: 'bg-blue-100 text-blue-800 border-blue-300' },
      'low': { className: 'bg-gray-100 text-gray-800 border-gray-300' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];

    return (
      <Badge variant="outline" className={config.className}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="w-3 h-3 text-red-600" />;
    if (trend < 0) return <ArrowDown className="w-3 h-3 text-green-600" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  const getComplianceColor = (score: number, status: string) => {
    if (status === 'excellent') return 'text-green-600';
    if (status === 'good') return 'text-blue-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    highPriority: alerts.filter(a => a.priority === 'urgent' || a.priority === 'high').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    avgResolutionTime: '4.2 hours',
    complianceScore: Math.round(complianceMetrics.reduce((acc, metric) => acc + metric.score, 0) / complianceMetrics.length * 10) / 10,
    todayAlerts: 8
  };

  const departments = [...new Set(alerts.map(alert => alert.department))];

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
                  <h1 className="text-2xl font-bold">Compliance & Alert Management</h1>
                  <p className="text-primary-foreground/90 text-sm">
                    Real-time monitoring, compliance tracking, and intelligent alerting system
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={realTimeMonitoring}
                  onCheckedChange={setRealTimeMonitoring}
                />
                <span className="text-sm text-primary-foreground/90">Real-time Monitoring</span>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-100 border-green-500/20">
                <Activity className="w-3 h-3 mr-1" />
                System Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold text-primary">{alertStats.total}</p>
                  <p className="text-xs text-green-600 mt-1">+{alertStats.todayAlerts} today</p>
                </div>
                <Bell className="w-8 h-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{alertStats.active}</p>
                  <p className="text-xs text-muted-foreground mt-1">Require attention</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                  <p className="text-2xl font-bold text-orange-600">{alertStats.critical}</p>
                  <p className="text-xs text-orange-600 mt-1">Immediate action</p>
                </div>
                <XCircle className="w-8 h-8 text-orange-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-yellow-600">{alertStats.highPriority}</p>
                  <p className="text-xs text-yellow-600 mt-1">Urgent review</p>
                </div>
                <Target className="w-8 h-8 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{alertStats.resolved}</p>
                  <p className="text-xs text-green-600 mt-1">Completed</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                  <p className="text-2xl font-bold text-blue-600">{alertStats.avgResolutionTime}</p>
                  <p className="text-xs text-blue-600 mt-1">Efficient</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="alerts" className="space-y-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4 gap-1">
              <TabsTrigger value="alerts" className="flex items-center space-x-2 px-4 py-2">
                <Bell className="w-4 h-4" />
                <span>Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center space-x-2 px-4 py-2">
                <Shield className="w-4 h-4" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2 px-4 py-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2 px-4 py-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Dialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Custom Alert</DialogTitle>
                    <DialogDescription>
                      Create a custom alert rule for monitoring specific conditions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Alert Title</Label>
                      <Input placeholder="Enter alert title" />
                    </div>
                    <div className="space-y-2">
                      <Label>Severity Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliance">Compliance</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Detailed description of the alert condition" rows={3} />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="outline" onClick={() => setIsCreateAlertOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => {
                      toast.success('Alert rule created successfully');
                      setIsCreateAlertOpen(false);
                    }}>
                      Create Alert
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          <TabsContent value="alerts" className="space-y-6">
            {/* Search and Filters */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search alerts, descriptions, or IDs..."
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
                      <SelectItem value="system">System</SelectItem>
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
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Table */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-primary" />
                      <span>Alert Dashboard</span>
                    </CardTitle>
                    <CardDescription>
                      {filteredAlerts.length} of {alerts.length} alerts • Last updated: {new Date().toLocaleTimeString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-semibold">Alert Details</TableHead>
                        <TableHead className="font-semibold">Severity</TableHead>
                        <TableHead className="font-semibold">Category</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Assigned To</TableHead>
                        <TableHead className="font-semibold">Due Date</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlerts.map((alert) => (
                        <TableRow key={alert.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="max-w-md">
                            <div className="space-y-2">
                              <div className="flex items-start space-x-2">
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-sm leading-tight">{alert.title}</p>
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {alert.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <span className="font-medium">{alert.id}</span>
                                <Separator orientation="vertical" className="h-3" />
                                <span>{alert.source}</span>
                                <Separator orientation="vertical" className="h-3" />
                                <span>{formatDate(alert.timestamp)}</span>
                                {alert.documentId && (
                                  <>
                                    <Separator orientation="vertical" className="h-3" />
                                    <span>Doc: {alert.documentId}</span>
                                  </>
                                )}
                              </div>
                              {alert.estimatedTime && (
                                <div className="flex items-center space-x-1 text-xs">
                                  <Clock className="w-3 h-3 text-blue-600" />
                                  <span className="text-blue-600">Est. {alert.estimatedTime}h resolution</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {alert.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(alert.status)}</TableCell>
                          <TableCell>{getPriorityBadge(alert.priority)}</TableCell>
                          <TableCell>
                            {alert.assignedTo ? (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span className="text-sm font-medium">{alert.assignedTo}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {alert.department}
                                </Badge>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {alert.dueDate ? (
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span className="text-sm">{formatDate(alert.dueDate)}</span>
                                </div>
                                {alert.dueDate < new Date() && (
                                  <Badge variant="destructive" className="text-xs">
                                    Overdue
                                  </Badge>
                                )}
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
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="w-4 h-4" />
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
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    <span>Compliance Metrics</span>
                  </CardTitle>
                  <CardDescription>Real-time compliance monitoring across all categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                        <div className={`text-2xl font-bold ${getComplianceColor(metric.score, metric.status)}`}>
                          {metric.score}%
                        </div>
                        <Progress value={metric.score} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>Target: {metric.target}%</span>
                          <Badge 
                            variant={metric.status === 'excellent' ? 'default' : metric.status === 'good' ? 'secondary' : 'destructive'}
                            className={
                              metric.status === 'excellent' ? 'bg-green-500 hover:bg-green-600' : 
                              metric.status === 'good' ? 'bg-blue-500 hover:bg-blue-600' :
                              metric.status === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                            }
                          >
                            {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                          </Badge>
                        </div>
                        {metric.issues > 0 && (
                          <div className="text-xs text-muted-foreground">
                            {metric.issues} active issue{metric.issues > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-accent" />
                    <span>Risk Distribution</span>
                  </CardTitle>
                  <CardDescription>Current risk assessment across all alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChartComponent>
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
                    </PieChartComponent>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {riskDistribution.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded-md bg-muted/30">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Alert Trends & Analytics</span>
                </CardTitle>
                <CardDescription>Historical alert patterns and resolution metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={alertTrends}>
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
                    />
                    <Area type="monotone" dataKey="critical" stackId="1" stroke="#DC2626" fill="#DC2626" fillOpacity={0.6} name="Critical" />
                    <Area type="monotone" dataKey="high" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="High" />
                    <Area type="monotone" dataKey="medium" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name="Medium" />
                    <Area type="monotone" dataKey="low" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Low" />
                    <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.8} name="Resolved" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Analytics Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-lg border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h4 className="font-medium">Improving Trends</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Resolution time down 23%</li>
                    <li>• Critical alerts reduced 67%</li>
                    <li>• Compliance score up 2.1%</li>
                    <li>• Prevention rate improved 18%</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium">System Performance</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 99.97% system uptime</li>
                    <li>• Real-time monitoring active</li>
                    <li>• 2.1s average response time</li>
                    <li>• 98.7% accuracy rate</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-l-4 border-l-accent">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-accent" />
                    <h4 className="font-medium">Key Achievements</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Zero security breaches</li>
                    <li>• 100% regulatory compliance</li>
                    <li>• 47,562 documents monitored</li>
                    <li>• Proactive threat detection</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
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
                        <span className="text-sm">Email Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS Alerts</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Critical Alert Sound</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Desktop Notifications</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Real-time Dashboard</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Reports</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Monitoring Thresholds</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Compliance Score Threshold</span>
                        <span className="font-medium text-sm">95%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Document Access Anomaly</span>
                        <span className="font-medium text-sm">5 per hour</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Failed Login Attempts</span>
                        <span className="font-medium text-sm">3 attempts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Response Time</span>
                        <span className="font-medium text-sm">5 seconds</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <BellRing className="w-5 h-5 text-secondary" />
                    <span>Alert Rules</span>
                  </CardTitle>
                  <CardDescription>Manage custom alert rules and conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Document Upload Monitoring</p>
                        <p className="text-xs text-muted-foreground">Monitor large file uploads and processing delays</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Compliance Score Changes</p>
                        <p className="text-xs text-muted-foreground">Alert on significant compliance score drops</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Security Access Patterns</p>
                        <p className="text-xs text-muted-foreground">Monitor unusual document access patterns</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">System Performance</p>
                        <p className="text-xs text-muted-foreground">Alert on performance degradation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Real-time Monitoring Status */}
        {realTimeMonitoring && (
          <Card className="shadow-lg border-l-4 border-l-secondary bg-gradient-to-r from-secondary/5 via-background to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Activity className="w-5 h-5 text-secondary animate-pulse" />
                  </div>
                  <div>
                    <p className="font-medium">Real-time Compliance Monitoring Active</p>
                    <p className="text-sm text-muted-foreground">
                      Scanning {formatNumber(47562)} documents • Last scan: 2 minutes ago • Next scan: 3 minutes • Compliance: {alertStats.complianceScore}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                    <Zap className="w-3 h-3 mr-1" />
                    MONITORING
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    System Healthy
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